"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    slotId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.BookingModel = (0, mongoose_1.model)("Booking", BookingSchema);
