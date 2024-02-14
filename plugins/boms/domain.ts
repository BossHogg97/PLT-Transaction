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

// Create types from zod objects
export type UpdateParentsBody = z.infer<typeof requestBodyUpdateParents>
export type DeleteItemsParam = z.infer<typeof paramsDeleteItem>

// Convert zod object to json schema
export const requestPutSchema = zodToJsonSchema(requestBodyUpdateParents)
export const paramsDeleteSchema = zodToJsonSchema(paramsDeleteItem)