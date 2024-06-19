import Express from "express";
import { CreateNewUser, LoginUserByEmail } from "../module/user/user.controller";

const route = Express.Router();

route.post("/auth/signup", CreateNewUser);
route.post("/auth/login", LoginUserByEmail);

const UserRoute = route;
export default UserRoute;