import mongoose, { model, Schema } from "mongoose";
import { review } from "./review.interface";

const ReviewSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    review: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const ReviewModel = model("review", ReviewSchema);