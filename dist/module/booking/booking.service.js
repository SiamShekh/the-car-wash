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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMyBookingData = exports.GetAllBookingService = exports.CreateBooking_Service = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const slot_model_1 = require("../slot/slot.model");
const booking_model_1 = require("./booking.model");
const CreateBooking_Service = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sessionBooking = yield mongoose_1.default.startSession();
    try {
        sessionBooking.startTransaction();
        const result = yield booking_model_1.BookingModel.create([payload], { new: true, runValidators: true, sessionBooking });
        const updateBooked = yield slot_model_1.SlotModel.findByIdAndUpdate(payload.slotId, { $set: { isBooked: 'booked' } }, { new: true, runValidators: true, sessionBooking });
        const findResult = yield booking_model_1.BookingModel
            .findById((_a = result[0]) === null || _a === void 0 ? void 0 : _a._id)
            .populate('customerId', 'name email phone address')
            .populate('serviceId')
            .populate('slotId');
        if (!result) {
            throw new Error("booking failed");
        }
        if (!updateBooked) {
            throw new Error("booking status changed faild");
        }
        yield sessionBooking.commitTransaction();
        yield sessionBooking.endSession();
        return findResult;
    }
    catch (error) {
        yield sessionBooking.abortTransaction();
        yield sessionBooking.endSession();
        throw new Error(error);
    }
});
exports.CreateBooking_Service = CreateBooking_Service;
const GetAllBookingService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.BookingModel
        .find({})
        .populate('customerId', 'name email phone address')
        .populate('serviceId')
        .populate('slotId');
    return result;
});
exports.GetAllBookingService = GetAllBookingService;
const GetMyBookingData = (header) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.BookingModel
        .find({ customerId: header === null || header === void 0 ? void 0 : header._id })
        .populate('customerId', 'name email phone address')
        .populate('serviceId')
        .populate('slotId');
    return result;
});
exports.GetMyBookingData = GetMyBookingData;
