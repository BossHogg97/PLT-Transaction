import fp from 'fastify-plugin'
import { type FastifyInstance, FastifyRequest } from 'fastify'

// Schema Imports
import { schemaDelete, schemaUpdate } from './schema'

// Type Imports
import { UpdateParentsBody, DeleteItemsParam } from './domain'

export default fp(async (app: FastifyInstance) => {
  app.delete(
    '/boms/items',
    { schema: schemaDelete },
    async function (request: FastifyRequest<{ Querystring: DeleteItemsParam }>, reply) {
      const { db, sql } = app.platformatic
      const result = await db.query(sql`
          DELETE FROM boms WHERE path LIKE ${request.query.path}
          `)

      reply.send(result)
    }
  )

  app.put(
    '/boms/parents',
    { schema: schemaUpdate },
    async function (request: FastifyRequest<{ Body: UpdateParentsBody }>, reply) {
      // Get Body obj
      const itemToUpdate: UpdateParentsBody = { ...request.body }

      const { db, sql } = app.platformatic

      try {
        const result = await db.tx(async (tx) => {
          // 1 - Update node data
          await tx.query(sql`
            UPDATE boms SET
              item = ${itemToUpdate.item},
              description = ${itemToUpdate.description},
              description_en = ${itemToUpdate.descriptionEn},
              type = ${itemToUpdate.type},
              selection = ${itemToUpdate.selection},
              t_n = ${itemToUpdate.tN},
              quantity = ${itemToUpdate.quantity},
              revision = ${itemToUpdate.revision},
              spare_index = ${itemToUpdate.spareIndex},
              wbe = ${itemToUpdate.wbe},
              description_wbe = ${itemToUpdate.descriptionWbe},
              tag = ${itemToUpdate.tag}
            WHERE uuid = ${itemToUpdate.uuid}
          `)

          // 2 - Update parent
          await tx.query(sql`
            UPDATE boms
            SET parent = ${request.body.item}
            WHERE path LIKE ${request.body.path} AND level = ${request.body.level} + 1
          `)

          // 3 - Update paths
          await tx.query(sql`
            UPDATE boms
            SET path = REPLACE(path, ${request.body.itemToReplace}, ${request.body.item})
            WHERE path LIKE ${request.body.path}
          `)
        })

        reply.send(200)
      } catch (e) {
        // rollback
        app.log.error(e)
      }
    }
  )
})
