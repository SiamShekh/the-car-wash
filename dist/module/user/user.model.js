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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    }
}, { timestamps: true });
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const isUserExits = yield exports.UserModel.findOne({ $or: [{ email: user === null || user === void 0 ? void 0 : user.email }, { phone: user === null || user === void 0 ? void 0 : user.phone }] });
        if (isUserExits) {
            throw new Error("the user is already exits in the server");
        }
        next();
    });
});
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
