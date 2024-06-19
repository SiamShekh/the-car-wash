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
        type: Number,
        required: true
    },
    registrationPlate: {
        type: String,
        required: true
    },
});

BookingSchema.pre('save', async function (next) {
    const BookingPayload = this;
    const filter = {
        serviceId: BookingPayload?.serviceId,
        slotId: BookingPayload?.slotId,
        registrationPlate: BookingPayload?.registrationPlate
    };
    const response = await BookingModel.findOne(filter);
    if (response) {
        throw new Error("The car is already register for this service.");
    } else {

        const serviceDB = await ServiceModel.findById(BookingPayload?.serviceId);
        const slotDB: any = await SlotModel.findById(BookingPayload?.slotId);
        const customerDB = await UserModel.findById(BookingPayload?.customerId);
        
        if (serviceDB) {
            if (slotDB) {
                if (slotDB?.isBooked === 'available') {
                    if (customerDB) {
                        next();
                    } else {
                        throw new Error("Customer dosen't exits.");
                    }
                } else {
                    throw new Error("Slot is already booked");
                }
            } else {
                throw new Error("Slot is not exits");
            }
        } else {
            throw new Error("Service is not exits");
        }
    }
})

export const BookingModel = model("Booking", BookingSchema);