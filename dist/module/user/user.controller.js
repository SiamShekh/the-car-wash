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
exports.UpdateAccountData = exports.AdminDashboard = exports.AppointAsAdmin = exports.UserList = exports.MyAdmin = exports.MyInfo = exports.MyProfile = exports.LoginUserByEmail = exports.CreateNewUser = void 0;
const catchAsync_1 = __importDefault(require("../../middlewars/catchAsync"));
const user_service_1 = require("./user.service");
const responseData_1 = __importDefault(require("../../middlewars/responseData"));
const http_status_1 = __importDefault(require("http-status"));
const user_zod_1 = require("./user.zod");
const user_model_1 = require("./user.model");
const service_model_1 = require("../service/service.model");
const slot_model_1 = require("../slot/slot.model");
const booking_model_1 = require("../booking/booking.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
exports.MyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const me = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email;
    if (me) {
        const user = yield user_model_1.UserModel.findOne({ email: me });
        if (user) {
            return res.send({
                success: true,
                statusCode: 200,
                message: "User found!",
                data: {
                    "ping": true
                }
            });
        }
        else {
            return res.send({
                success: true,
                statusCode: 200,
                message: "User is not found!",
                data: {
                    ping: false
                }
            });
        }
    }
    else {
        return res.send({
            success: true,
            statusCode: 200,
            message: "User is not found!",
            data: {
                ping: false
            }
        });
    }
}));
exports.MyInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const me = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.email;
    if (me) {
        const user = yield user_model_1.UserModel.findOne({ email: me });
        console.log(user);
        if (user) {
            return res.send({
                success: true,
                statusCode: 200,
                message: "User found!",
                data: user
            });
        }
        else {
            return res.send({
                success: true,
                statusCode: 200,
                message: "User is not found!",
                data: user
            });
        }
    }
    else {
        return res.send({
            success: true,
            statusCode: 200,
            message: "User is not found!",
            data: []
        });
    }
}));
exports.MyAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const me = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.email;
    if (me) {
        const user = yield user_model_1.UserModel.findOne({ email: me });
        console.log(user);
        if ((user === null || user === void 0 ? void 0 : user.role) === 'admin') {
            return res.send({
                success: true,
                statusCode: 200,
                message: "Admin found!",
                data: {
                    "ping": true
                }
            });
        }
        else {
            return res.send({
                success: false,
                statusCode: 200,
                message: "User is not admin!",
                data: {
                    ping: false
                }
            });
        }
    }
    else {
        return res.send({
            success: true,
            statusCode: 200,
            message: "User is not found!",
            data: {
                ping: false
            }
        });
    }
}));
exports.UserList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserList = yield user_model_1.UserModel.find({});
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, "User List Retrive", UserList));
}));
exports.AppointAsAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const id = (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.id;
    const UserList = yield user_model_1.UserModel.findByIdAndUpdate(id, { $set: { role: "admin" } });
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, "User List Retrive", []));
}));
exports.AdminDashboard = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const count = {
        user: yield user_model_1.UserModel.estimatedDocumentCount(),
        booking: yield booking_model_1.BookingModel.estimatedDocumentCount(),
        service: (yield service_model_1.ServiceModel.find({ isDeleted: false })).length,
        slot: (yield slot_model_1.SlotModel.find({ isBooked: "available" })).length,
    };
    const data = {
        user: yield user_model_1.UserModel.find({}).limit(6).sort('-updatedAt'),
    };
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, "Dashboard Data Retrive", { count, data }));
}));
exports.UpdateAccountData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const userExits = yield user_model_1.UserModel.findOne({ email: (_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.email });
    if (userExits) {
        const passwordCompare = yield bcrypt_1.default.compare(req === null || req === void 0 ? void 0 : req.body.password, userExits === null || userExits === void 0 ? void 0 : userExits.password);
        if (passwordCompare) {
            let hash = "";
            if ((_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.newPassword) {
                hash = yield bcrypt_1.default.hash((_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.newPassword, 10);
            }
            const update = {
                password: hash ? hash : userExits === null || userExits === void 0 ? void 0 : userExits.password,
                address: ((_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.address) ? (_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.address : userExits === null || userExits === void 0 ? void 0 : userExits.address,
                phone: ((_k = req === null || req === void 0 ? void 0 : req.body) === null || _k === void 0 ? void 0 : _k.phone) ? (_l = req === null || req === void 0 ? void 0 : req.body) === null || _l === void 0 ? void 0 : _l.phone : userExits === null || userExits === void 0 ? void 0 : userExits.phone,
                name: ((_m = req === null || req === void 0 ? void 0 : req.body) === null || _m === void 0 ? void 0 : _m.name) ? (_o = req === null || req === void 0 ? void 0 : req.body) === null || _o === void 0 ? void 0 : _o.name : userExits === null || userExits === void 0 ? void 0 : userExits.phone
            };
            const result = yield user_model_1.UserModel.findOneAndUpdate({ email: (_p = req === null || req === void 0 ? void 0 : req.user) === null || _p === void 0 ? void 0 : _p.email }, update);
            return res.send({
                "success": true,
                "statusCode": 200,
                "message": "User info changed successfully",
                "data": result
            });
        }
        else {
            throw new Error("Password is not matched!");
        }
    }
    else {
        throw new Error("user are not exits.");
    }
}));
