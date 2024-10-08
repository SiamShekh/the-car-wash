"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const GlobalErrorHandler_1 = __importDefault(require("./middlewars/GlobalErrorHandler"));
const route_1 = __importDefault(require("./route/route"));
app.use((0, cors_1.default)({
    origin: 'https://carwisho-ltd.vercel.app',
}));
app.use(express_1.default.json());
app.use("/api", route_1.default);
app.use(GlobalErrorHandler_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
exports.default = app;
