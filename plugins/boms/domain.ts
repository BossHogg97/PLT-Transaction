import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

const paramsDeleteItem = z.object({
    path: z.string()
})

const requestBodyUpdateParents = z.object({
    uuid: z.string(),
    item: z.string(),
    description: z.string(),
    descriptionEn: z.string(),
    type: z.string(),
    selection: z.string(),
    tN: z.number(),
    quantity: z.number(),
    revision: z.string(),
    spareIndex: z.string(),
    wbe: z.string(),
    descriptionWbe: z.string(),
    tag: z.string(),
    path: z.string(),
    level: z.number(),
    itemToReplace: z.string()
})

const itemAction = z.object({
    plantId: z.string(),
    parentBefore: z.string(),
    parentCurrent: z.string(),
    uuid: z.string(),
    targetPath: z.string(), // Used for append the moved node
    sourcePath: z.string(), // Used for retrieve all children of given node and update path property
    targetLevel: z.number(),
    node: z.string(), // Is the name of dragged node
  })
  
  const requestBodyActions = z.array(itemAction)

// Create types from zod objects
export type UpdateParentsBody = z.infer<typeof requestBodyUpdateParents>
export type DeleteItemsParam = z.infer<typeof paramsDeleteItem>
export type UpdateActionsBody = z.infer<typeof requestBodyActions>

// Convert zod object to json schema
export const requestPutSchema = zodToJsonSchema(requestBodyUpdateParents)
export const paramsDeleteSchema = zodToJsonSchema(paramsDeleteItem)
export const requestActionsSchema = zodToJsonSchema(requestBodyActions)