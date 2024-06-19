"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseData = (success, statusCode, message, data) => {
    return {
        "success": success,
        "statusCode": statusCode,
        "message": message,
        "data": data
    };
};
exports.default = responseData;
