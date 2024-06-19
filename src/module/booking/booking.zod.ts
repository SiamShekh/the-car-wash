import { z } from "zod";

const BookingZod = z.object({
    service: z.string(),
    slot: z.string(),
    vehicleType: z.string(),
    vehicleBrand: z.string(),
    vehicleModel: z.string(),
    manufacturingYear: z.number().min(4, 'year have 4 chars...').max(4),
    registrationPlate: z.string()
});

export default BookingZod;