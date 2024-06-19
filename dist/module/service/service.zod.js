"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceZod = void 0;
const zod_1 = require("zod");
exports.ServiceZod = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    duration: zod_1.z.number(),
    isDeleted: zod_1.z.boolean(),
});
