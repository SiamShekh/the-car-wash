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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAvilableSlots = exports.CreateSlot_Service = void 0;
const service_model_1 = require("../service/service.model");
const slot_model_1 = require("./slot.model");
const CreateSlot_Service = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const findServices = yield service_model_1.ServiceModel.findById(payload.service);
    if (findServices === null || findServices === void 0 ? void 0 : findServices.isDeleted) {
        throw new Error("The services is already deleted!");
    }
    else {
        const calculateStartTime = Number((_a = payload === null || payload === void 0 ? void 0 : payload.startTime) === null || _a === void 0 ? void 0 : _a.split(':')[0]) * 60 + Number((_b = payload === null || payload === void 0 ? void 0 : payload.startTime) === null || _b === void 0 ? void 0 : _b.split(':')[1]);
        const calculateEndTime = Number((_c = payload === null || payload === void 0 ? void 0 : payload.endTime) === null || _c === void 0 ? void 0 : _c.split(':')[0]) * 60 + Number((_d = payload === null || payload === void 0 ? void 0 : payload.endTime) === null || _d === void 0 ? void 0 : _d.split(':')[1]);
        const calculateSlots = Math.floor((calculateEndTime - calculateStartTime) / Number((findServices === null || findServices === void 0 ? void 0 : findServices.duration) || 0));
        const SlotArr = [];
        let SlotStart = calculateStartTime;
        for (let index = 0; index < calculateSlots; index++) {
            const SlotEnd = SlotStart + Number(findServices === null || findServices === void 0 ? void 0 : findServices.duration);
            const Slot = {
                "service": payload === null || payload === void 0 ? void 0 : payload.service,
                "date": payload === null || payload === void 0 ? void 0 : payload.date,
                "startTime": `${String(Math.floor(SlotStart / 60)).padStart(2, '0')}:${String(SlotStart % 60).padStart(2, '0')}`,
                "endTime": `${String(Math.floor(SlotEnd / 60)).padStart(2, '0')}:${String(SlotEnd % 60).padStart(2, '0')}`,
                "isBooked": "available",
            };
            const result = yield slot_model_1.SlotModel.create(Slot);
            SlotArr.push(result);
            SlotStart = SlotEnd;
        }
        return SlotArr;
    }
});
exports.CreateSlot_Service = CreateSlot_Service;
const GetAvilableSlots = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield slot_model_1.SlotModel
        .find({ $or: [{ date: query === null || query === void 0 ? void 0 : query.date }, { service: query === null || query === void 0 ? void 0 : query.serviceId }] })
        .populate('service');
    return result;
});
exports.GetAvilableSlots = GetAvilableSlots;
