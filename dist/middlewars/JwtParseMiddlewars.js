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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../module/user/user.model");
const catchAsync_1 = __importDefault(require("./catchAsync"));
const JwtParseMiddlewars = (role) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const headers = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (headers) {
            const decode = yield jsonwebtoken_1.default.verify(headers, "amiscrectbolsitomik");
            const isUser = yield user_model_1.UserModel.findOne({ email: decode === null || decode === void 0 ? void 0 : decode.email });
            if ((isUser === null || isUser === void 0 ? void 0 : isUser.role) === (decode === null || decode === void 0 ? void 0 : decode.role)) {
                if ((role === 'admin' && (isUser === null || isUser === void 0 ? void 0 : isUser.role) === 'admin') ||
                    (role === 'user' && ((isUser === null || isUser === void 0 ? void 0 : isUser.role) === 'user' || (isUser === null || isUser === void 0 ? void 0 : isUser.role) === 'admin'))) {
                    req.user = isUser;
                    next();
                }
                else {
                    throw new Error('You are not authorized!');
                }
            }
            else {
                throw new Error('You are not authorized!');
            }
        }
        else {
            throw new Error('Auth token is undefined or your are a unauthraized guy!');
        }
    }));
};
exports.default = JwtParseMiddlewars;
