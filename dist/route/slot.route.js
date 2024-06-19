"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const slot_controller_1 = require("../module/slot/slot.controller");
const route = express_1.default.Router();
route.get("/slots/availability", slot_controller_1.GetAvilableSlot);
const SlotRoute = route;
exports.default = SlotRoute;
