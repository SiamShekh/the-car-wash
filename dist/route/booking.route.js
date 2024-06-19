"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("../module/booking/booking.controller");
const vaildate_request_body_1 = __importDefault(require("../middlewars/vaildate_request_body"));
const booking_zod_1 = __importDefault(require("../module/booking/booking.zod"));
const JwtParseMiddlewars_1 = __importDefault(require("../middlewars/JwtParseMiddlewars"));
const route = express_1.default.Router();
route.post("/bookings", (0, vaildate_request_body_1.default)(booking_zod_1.default), booking_controller_1.CreateBooking);
route.get("/bookings", (0, JwtParseMiddlewars_1.default)('admin'), booking_controller_1.GetAllBooking);
route.get("/my-bookings", (0, JwtParseMiddlewars_1.default)('user'), booking_controller_1.MyBooking);
const BookingRoute = route;
exports.default = BookingRoute;
