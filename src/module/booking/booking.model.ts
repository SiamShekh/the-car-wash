import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";
import { ServiceModel } from "../service/service.model";
import { SlotModel } from "../slot/slot.model";
import { UserModel } from "../user/user.model";

const BookingSchema = new Schema<TBooking>({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    slotId: {
        type: Schema.Types.ObjectId,
        ref: 'Slot',
        required: true,
        unique: true
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
        type: Number,
        required: true
    },
    registrationPlate: {
        type: String,
        required: true
    },
});

export const BookingModel = model("Booking", BookingSchema);