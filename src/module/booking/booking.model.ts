import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const BookingSchema = new Schema<TBooking>({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    slot: {
        type: Schema.Types.ObjectId,
        ref: 'Slot',
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    vehicleBrand: {
        type: String,
        required: true
    },
    vehicleModel: {
        type: String,
        required: true
    },
    manufacturingYear: {
        type: String,
        required: true
    },
    registrationPlate: {
        type: String,
        required: true
    },
});

export const BookingModel = model("Booking", BookingSchema);