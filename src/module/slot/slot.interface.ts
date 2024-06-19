import mongoose from "mongoose";

export interface TSlot {
    service: mongoose.Types.ObjectId,
    startTime: String,
    endTime: String,
    date: String
}