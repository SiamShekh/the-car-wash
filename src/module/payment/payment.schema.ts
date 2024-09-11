import mongoose, { model, Schema } from "mongoose";
import { boolean } from "zod";

const schema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User"
    },
    slot: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Slot"
    },
    status: {
        type: Boolean,
        required: true
    },
    trans: {
        type: String,
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
}, {
    timestamps: true
});

export const PaymentModel = model("payment", schema);