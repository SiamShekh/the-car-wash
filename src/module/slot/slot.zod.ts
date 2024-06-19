import { z } from "zod";

export const SlotZod = z.object({
    service: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    date: z.string()
})