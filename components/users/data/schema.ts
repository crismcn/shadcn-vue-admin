import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const personSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  visits: z.number(),
  status: z.string(),
  progress: z.number(),
})

export type Person = z.infer<typeof personSchema>
