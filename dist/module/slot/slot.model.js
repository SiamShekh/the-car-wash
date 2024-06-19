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
exports.SlotModel = void 0;
const mongoose_1 = require("mongoose");
const SlotSchema = new mongoose_1.Schema({
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
SlotSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = this;
        const filter = {
            service: payload.service,
            startTime: payload.startTime,
            endTime: payload.endTime,
            date: payload.date,
        };
        const result = yield exports.SlotModel.findOne(filter);
        if (result) {
            throw new Error('The slot is already created! why you try to make it again?');
        }
        else {
            next();
        }
    });
});
exports.SlotModel = (0, mongoose_1.model)("Slot", SlotSchema);
