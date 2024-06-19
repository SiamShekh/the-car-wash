import { Types } from "mongoose";

export interface TBooking {
    customer: Types.ObjectId,
    service: Types.ObjectId,
    slot: Types.ObjectId,
    vehicleType: String,
    vehicleBrand: String,
    vehicleModel: String,
    manufacturingYear: String,
    registrationPlate: String,
}