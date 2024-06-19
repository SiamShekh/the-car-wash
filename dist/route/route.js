"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const service_route_1 = __importDefault(require("./service.route"));
const slot_route_1 = __importDefault(require("./slot.route"));
const booking_route_1 = __importDefault(require("./booking.route"));
const route = express_1.default.Router();
route.use(user_route_1.default);
route.use(service_route_1.default);
route.use(slot_route_1.default);
route.use(booking_route_1.default);
exports.default = route;
