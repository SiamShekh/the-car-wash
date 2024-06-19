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
exports.GetAvilableSlot = exports.CreateSlot_Controller = void 0;
const catchAsync_1 = __importDefault(require("../../middlewars/catchAsync"));
const slot_services_1 = require("./slot.services");
const responseData_1 = __importDefault(require("../../middlewars/responseData"));
const http_status_1 = __importDefault(require("http-status"));
exports.CreateSlot_Controller = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, slot_services_1.CreateSlot_Service)(req.body);
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, 'Slots created successfully', result));
}));
exports.GetAvilableSlot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, slot_services_1.GetAvilableSlots)(req.query);
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, 'Available slots retrieved successfully', result));
}));
