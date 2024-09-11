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
exports.SingleSlotInformission = exports.ChangeSlotsStatus = exports.GetAvilableSlotAdmin = exports.GetAvilableSlot = exports.CreateSlot_Controller = void 0;
const catchAsync_1 = __importDefault(require("../../middlewars/catchAsync"));
const slot_services_1 = require("./slot.services");
const responseData_1 = __importDefault(require("../../middlewars/responseData"));
const http_status_1 = __importDefault(require("http-status"));
const slot_model_1 = require("./slot.model");
exports.CreateSlot_Controller = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, slot_services_1.CreateSlot_Service)(req.body);
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, 'Slots created successfully', result));
}));
exports.GetAvilableSlot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, slot_services_1.GetAvilableSlots)(req.query);
    return res.send(result.length ? (0, responseData_1.default)(true, http_status_1.default.OK, 'Available slots retrieved successfully', result) : (0, responseData_1.default)(true, http_status_1.default.OK, 'No Data Found!', result));
}));
exports.GetAvilableSlotAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield slot_model_1.SlotModel
        .find({ service: (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.serviceId })
        .populate('service');
    return res.send(result.length ? (0, responseData_1.default)(true, http_status_1.default.OK, 'Available slots retrieved successfully', result) : (0, responseData_1.default)(true, http_status_1.default.OK, 'No Data Found!', result));
}));
exports.ChangeSlotsStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const data = yield slot_model_1.SlotModel.findById((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.id);
    if (data) {
        const result = yield slot_model_1.SlotModel
            .findByIdAndUpdate((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.id, {
            $set: {
                isBooked: (data === null || data === void 0 ? void 0 : data.isBooked) === 'available' ? 'cancelled' : 'available'
            }
        });
        return res.send((0, responseData_1.default)(true, http_status_1.default.OK, 'Available slots retrieved successfully', { result }));
    }
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, 'No Data Found!', []));
}));
exports.SingleSlotInformission = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const result = yield slot_model_1.SlotModel.findById((_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.id)
        .populate("service");
    return res.send(result ? (0, responseData_1.default)(true, http_status_1.default.OK, ' slots retrieved successfully', result) : (0, responseData_1.default)(true, http_status_1.default.OK, 'No Data Found!', []));
}));
