"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const slot_controller_1 = require("../module/slot/slot.controller");
const JwtParseMiddlewars_1 = __importDefault(require("../middlewars/JwtParseMiddlewars"));
const route = express_1.default.Router();
route.get("/slots/availability", slot_controller_1.GetAvilableSlot);
route.get("/slots", slot_controller_1.SingleSlotInformission);
route.get("/admin/slots", slot_controller_1.GetAvilableSlotAdmin);
route.put("/admin/changed/slots", (0, JwtParseMiddlewars_1.default)('admin'), slot_controller_1.ChangeSlotsStatus);
const SlotRoute = route;
exports.default = SlotRoute;
