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
exports.LoginUserByEmail = exports.CreateNewUser = void 0;
const catchAsync_1 = __importDefault(require("../../middlewars/catchAsync"));
const user_service_1 = require("./user.service");
const responseData_1 = __importDefault(require("../../middlewars/responseData"));
const http_status_1 = __importDefault(require("http-status"));
const user_zod_1 = require("./user.zod");
exports.CreateNewUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vaildateUser = user_zod_1.UserZod.parse(req.body);
    const result = yield (0, user_service_1.CreateNewUserByPayload)(vaildateUser);
    res.send((0, responseData_1.default)(true, http_status_1.default.OK, "User registered successfully", result));
}));
exports.LoginUserByEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vaildateLoginInfo = user_zod_1.UserLoginZod.parse(req.body);
    const result = yield (0, user_service_1.LoginUserByEmailService)(vaildateLoginInfo);
    res.send(result);
}));
