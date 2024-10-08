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
exports.DeleteService_Service = exports.UpdateService_Service = exports.GetAllService_ServiceAdmin = exports.GetAllService_Service = exports.GetSingleDataByID = exports.CreateService_Service = void 0;
const service_model_1 = require("./service.model");
const CreateService_Service = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel.create(payload);
    return result;
});
exports.CreateService_Service = CreateService_Service;
const GetSingleDataByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel.findById(id);
    return result;
});
exports.GetSingleDataByID = GetSingleDataByID;
const GetAllService_Service = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel
        .find(Object.assign(Object.assign(Object.assign({}, ((payload === null || payload === void 0 ? void 0 : payload.searchTerm) && { name: { $regex: payload.searchTerm, $options: 'i' } })), ((payload === null || payload === void 0 ? void 0 : payload.maxPrice) && (payload === null || payload === void 0 ? void 0 : payload.minPrice) && { price: { $gte: payload.minPrice, $lte: payload.maxPrice } })), { isDeleted: false })).sort((payload === null || payload === void 0 ? void 0 : payload.sort) === 'Duration' ? (payload === null || payload === void 0 ? void 0 : payload.dsc) === 'DSC' ? '-duration' : 'duration' : (payload === null || payload === void 0 ? void 0 : payload.dsc) === 'DSC' ? '-price' : 'price');
    return result;
});
exports.GetAllService_Service = GetAllService_Service;
const GetAllService_ServiceAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel
        .find(Object.assign(Object.assign({}, ((payload === null || payload === void 0 ? void 0 : payload.searchTerm) && { name: { $regex: payload.searchTerm, $options: 'i' } })), ((payload === null || payload === void 0 ? void 0 : payload.maxPrice) && (payload === null || payload === void 0 ? void 0 : payload.minPrice) && { price: { $gte: payload.minPrice, $lte: payload.maxPrice } }))).sort((payload === null || payload === void 0 ? void 0 : payload.sort) === 'Duration' ? (payload === null || payload === void 0 ? void 0 : payload.dsc) === 'DSC' ? '-duration' : 'duration' : (payload === null || payload === void 0 ? void 0 : payload.dsc) === 'DSC' ? '-price' : 'price');
    return result;
});
exports.GetAllService_ServiceAdmin = GetAllService_ServiceAdmin;
const UpdateService_Service = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel.findByIdAndUpdate(id, { $set: Object.assign({}, payload) });
    const findUpdate = yield service_model_1.ServiceModel.findById(result === null || result === void 0 ? void 0 : result._id);
    return findUpdate;
});
exports.UpdateService_Service = UpdateService_Service;
const DeleteService_Service = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.ServiceModel.findByIdAndUpdate(id, { $set: { isDeleted: true } });
    const findUpdate = yield service_model_1.ServiceModel.findById(result === null || result === void 0 ? void 0 : result._id);
    return findUpdate;
});
exports.DeleteService_Service = DeleteService_Service;
