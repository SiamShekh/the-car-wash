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
exports.MyBooking = exports.GetAllBooking = exports.CreateBooking = void 0;
const catchAsync_1 = __importDefault(require("../../middlewars/catchAsync"));
const booking_service_1 = require("./booking.service");
const responseData_1 = __importDefault(require("../../middlewars/responseData"));
const http_status_1 = __importDefault(require("http-status"));
exports.CreateBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = Object.assign({ customerId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id }, req.body);
    const result = yield (0, booking_service_1.CreateBooking_Service)(payload);
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, 'Booking successful', result));
}));
exports.GetAllBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, booking_service_1.GetAllBookingService)();
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, 'All bookings retrieved successfully', result));
}));
exports.MyBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, booking_service_1.GetMyBookingData)(req.user);
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, 'User bookings retrieved successfully', result));
}));
