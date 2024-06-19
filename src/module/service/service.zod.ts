import { z } from "zod";

export const ServiceZod = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    duration: z.number(),
    isDeleted: z.boolean(),
})