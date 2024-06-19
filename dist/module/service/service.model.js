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
exports.ServiceModel = void 0;
const mongoose_1 = require("mongoose");
const ServiceSchema = new mongoose_1.Schema({
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
ServiceSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const service = this;
        const isServiceExits = yield exports.ServiceModel.findOne({ name: service.name });
        if (isServiceExits) {
            throw new Error("the service is already exits in the server");
        }
        next();
    });
});
exports.ServiceModel = (0, mongoose_1.model)("Service", ServiceSchema);
