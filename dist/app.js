"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const GlobalErrorHandler_1 = __importDefault(require("./middlewars/GlobalErrorHandler"));
const route_1 = __importDefault(require("./route/route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'https://carwisho-ltd.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use("/api", route_1.default);
app.use(GlobalErrorHandler_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
