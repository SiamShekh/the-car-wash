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
exports.LoginUserByEmailService = exports.CreateNewUserByPayload = void 0;
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CreateNewUserByPayload = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload;
    const hash = yield bcrypt_1.default.hash(password, 10);
    const result = yield user_model_1.UserModel.create(Object.assign(Object.assign({}, payload), { password: hash }));
    return result;
});
exports.CreateNewUserByPayload = CreateNewUserByPayload;
const LoginUserByEmailService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userExits = yield user_model_1.UserModel.findOne({ email: payload.email });
    if (userExits) {
        const passwordCompare = yield bcrypt_1.default.compare(payload.password, userExits === null || userExits === void 0 ? void 0 : userExits.password);
        if (passwordCompare) {
            const JWT_Payload = {
                email: userExits === null || userExits === void 0 ? void 0 : userExits.email,
                role: userExits === null || userExits === void 0 ? void 0 : userExits.role
            };
            const token = jsonwebtoken_1.default.sign(JWT_Payload, "amiscrectbolsitomik", { expiresIn: '7d' });
            return {
                "success": true,
                "statusCode": 200,
                "message": "User logged in successfully",
                "token": token,
                "data": userExits
            };
        }
        else {
            throw new Error("Password is not matching...");
        }
    }
    else {
        throw new Error("user are not exits.");
    }
});
exports.LoginUserByEmailService = LoginUserByEmailService;
