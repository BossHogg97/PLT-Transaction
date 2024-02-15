import { paramsDeleteSchema, requestPutSchema, requestActionsSchema } from "./domain"

export const schemaDelete = {
    description: 'Delete items based on path',
    tags: ['Bom Editor'],
    summary: 'Delete Items',
    querystring: paramsDeleteSchema
    // TODO Tipizzare la response
  }

export const schemaUpdate = {
  description: 'Update items parent and path',
  tags: ['Bom Editor'],
  summary: 'Update Parent',
  body: requestPutSchema
}

export const schemaMoveNode = {
  summary: 'Update node data after move',
  description: 'Update node and children information after move inside bom',
  tags: ['Bom Editor'],
  body: requestActionsSchema,
}
