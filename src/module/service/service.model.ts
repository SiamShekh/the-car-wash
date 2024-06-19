import { Schema, model } from "mongoose";
import { TService } from "./service.interface";

const ServiceSchema = new Schema<TService>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true
    },
});


ServiceSchema.pre("save", async function (next) {
    const service = this;
    const isServiceExits = await ServiceModel.findOne({ name: service.name });
    if (isServiceExits) {
        throw new Error("the service is already exits in the server")
    }
    next();
});

export const ServiceModel = model("Service", ServiceSchema);