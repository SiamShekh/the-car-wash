"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const GlobalErrorHandler = (err, req, res, next) => {
    var _a;
    if (err.code === 11000) {
        return res.send({
            "success": false,
            "statusCode": http_status_1.default.BAD_REQUEST,
            "message": err.errorResponse.errmsg || "some thing went wrong",
            "data": []
        });
    }
    if (err.name === 'ValidationError') {
        return res.send({
            "success": false,
            "statusCode": http_status_1.default.BAD_REQUEST,
            "message": err.message || "some thing went wrong",
            "data": []
        });
    }
    if (err instanceof zod_1.ZodError) {
        const error = [];
        (_a = err === null || err === void 0 ? void 0 : err.issues) === null || _a === void 0 ? void 0 : _a.map(data => {
            const shortError = {
                code: data === null || data === void 0 ? void 0 : data.code,
                message: data === null || data === void 0 ? void 0 : data.message,
            };
            error.push(shortError);
        });
        return res.send({
            "success": false,
            "statusCode": http_status_1.default.BAD_REQUEST,
            "message": error || "some thing went wrong",
            "data": []
        });
    }
    console.log(err);
    return res.send({
        "success": false,
        "statusCode": http_status_1.default.NOT_FOUND,
        "message": err.message || "some thing went wrong",
        "data": []
    });
};
exports.default = GlobalErrorHandler;
