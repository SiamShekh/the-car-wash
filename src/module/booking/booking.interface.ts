import { Types } from "mongoose";

export interface TBooking {
    customerId: Types.ObjectId,
    serviceId: Types.ObjectId,
    slotId: Types.ObjectId,
    vehicleType: String,
    vehicleBrand: String,
    vehicleModel: String,
    manufacturingYear: Number,
    registrationPlate: String,
}