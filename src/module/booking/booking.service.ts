import mongoose from "mongoose";
import { SlotModel } from "../slot/slot.model";
import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import _ENV from "../../config/config";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { UserModel } from "../user/user.model";

export const CreateBooking_Service = async (payload: TBooking) => {
    const sessionBooking = await mongoose.startSession();
    try {
        sessionBooking.startTransaction();

        const result = await BookingModel.create([payload], { new: true, runValidators: true, sessionBooking });
        const updateBooked = await SlotModel.findByIdAndUpdate(payload.slotId, { $set: { isBooked: 'booked' } }, { new: true, runValidators: true, sessionBooking });

        const findResult = await BookingModel
            .findById(result[0]?._id)
            .populate('customerId', 'name email phone address')
            .populate('serviceId')
            .populate('slotId')

        if (!result) {
            throw new Error("booking failed");
        }

        if (!updateBooked) {
            throw new Error("booking status changed faild");
        }

        await sessionBooking.commitTransaction();
        await sessionBooking.endSession();

        return findResult;
    } catch (error) {
        await sessionBooking.abortTransaction();
        await sessionBooking.endSession();
        throw new Error(error as any);

    }
}

export const GetAllBookingService = async () => {
    const result = await BookingModel
        .find({})
        .populate('customerId', 'name email phone address')
        .populate('serviceId')
        .populate('slotId')
    return result;
}


export const GetMyBookingData = async (header: any) => {
    const result = await BookingModel
        .find({ customerId: header?._id })
        .populate('customerId', 'name email phone address')
        .populate('serviceId')
        .populate('slotId')
    return result;
}