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
exports.DeleteServiceController = exports.UpdateServiceController = exports.GetAllServiceControllerAdmin = exports.GetAllServiceController = exports.GetSingleServiceByID = exports.CreateService = void 0;
const catchAsync_1 = __importDefault(require("../../middlewars/catchAsync"));
const service_zod_1 = require("./service.zod");
const services_service_1 = require("./services.service");
const responseData_1 = __importDefault(require("../../middlewars/responseData"));
const http_status_1 = __importDefault(require("http-status"));
exports.CreateService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vaildateZod = yield service_zod_1.ServiceZod.parse(req.body);
    const result = yield (0, services_service_1.CreateService_Service)(vaildateZod);
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, 'Service created successfully', result));
}));
exports.GetSingleServiceByID = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ID = req.params.id;
    const result = yield (0, services_service_1.GetSingleDataByID)(ID);
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, 'Service retrieved successfully', result));
}));
exports.GetAllServiceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, services_service_1.GetAllService_Service)(req === null || req === void 0 ? void 0 : req.query);
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, 'Service retrieved successfully', result));
}));
exports.GetAllServiceControllerAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, services_service_1.GetAllService_ServiceAdmin)(req === null || req === void 0 ? void 0 : req.query);
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, 'Service retrieved successfully', result));
}));
exports.UpdateServiceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, services_service_1.UpdateService_Service)(req.params.id, req.body);
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, 'Service update successfully', result));
}));
exports.DeleteServiceController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, services_service_1.DeleteService_Service)(req.params.id);
    return res.send((0, responseData_1.default)(true, http_status_1.default.OK, 'Service retrieved successfully', result));
}));
