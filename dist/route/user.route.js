"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../module/user/user.controller");
const route = express_1.default.Router();
route.post("/auth/signup", user_controller_1.CreateNewUser);
route.post("/auth/login", user_controller_1.LoginUserByEmail);
const UserRoute = route;
exports.default = UserRoute;
