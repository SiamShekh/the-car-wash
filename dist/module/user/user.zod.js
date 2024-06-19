"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginZod = exports.UserZod = void 0;
const zod_1 = require("zod");
exports.UserZod = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email("email is requird"),
    phone: zod_1.z.string(),
    password: zod_1.z.string().length(8, 'password must be within 8 chars.'),
    role: zod_1.z.enum(['admin', 'user']),
    address: zod_1.z.string(),
});
exports.UserLoginZod = zod_1.z.object({
    email: zod_1.z.string().email("email is requird"),
    password: zod_1.z.string().length(8, 'password must be within 8 chars.'),
});
