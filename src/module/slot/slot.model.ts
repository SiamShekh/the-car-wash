import mongoose, { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";

const SlotSchema = new Schema<TSlot>({
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    isBooked: {
        type: String,
        required: true,
        enum: ['available', 'booked']
    }
}, { timestamps: true })

SlotSchema.pre('save', async function (next) {
    const payload = this;
    const filter = {
        service: payload.service,
        startTime: payload.startTime,
        endTime: payload.endTime,
        date: payload.date,
    }
    const result = await SlotModel.findOne(filter);
    if (result) {
        throw new Error('The slot is already created! why you try to make it again?')
    }else{
        next();
    }
})

export const SlotModel = model("Slot", SlotSchema)