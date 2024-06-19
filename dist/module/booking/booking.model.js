"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
const mongoose_1 = require("mongoose");
const service_model_1 = require("../service/service.model");
const slot_model_1 = require("../slot/slot.model");
const user_model_1 = require("../user/user.model");
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
BookingSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const BookingPayload = this;
        const filter = {
            serviceId: BookingPayload === null || BookingPayload === void 0 ? void 0 : BookingPayload.serviceId,
            slotId: BookingPayload === null || BookingPayload === void 0 ? void 0 : BookingPayload.slotId,
            registrationPlate: BookingPayload === null || BookingPayload === void 0 ? void 0 : BookingPayload.registrationPlate
        };
        const response = yield exports.BookingModel.findOne(filter);
        if (response) {
            throw new Error("The car is already register for this service.");
        }
        else {
            const serviceDB = yield service_model_1.ServiceModel.findById(BookingPayload === null || BookingPayload === void 0 ? void 0 : BookingPayload.serviceId);
            const slotDB = yield slot_model_1.SlotModel.findById(BookingPayload === null || BookingPayload === void 0 ? void 0 : BookingPayload.slotId);
            const customerDB = yield user_model_1.UserModel.findById(BookingPayload === null || BookingPayload === void 0 ? void 0 : BookingPayload.customerId);
            if (serviceDB) {
                if (slotDB) {
                    if ((slotDB === null || slotDB === void 0 ? void 0 : slotDB.isBooked) === 'available') {
                        if (customerDB) {
                            next();
                        }
                        else {
                            throw new Error("Customer dosen't exits.");
                        }
                    }
                    else {
                        throw new Error("Slot is already booked");
                    }
                }
                else {
                    throw new Error("Slot is not exits");
                }
            }
            else {
                throw new Error("Service is not exits");
            }
        }
    });
});
exports.BookingModel = (0, mongoose_1.model)("Booking", BookingSchema);
