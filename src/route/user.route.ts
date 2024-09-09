import Express from "express";
import { CreateNewUser, LoginUserByEmail, MyAdmin, MyInfo, MyProfile } from "../module/user/user.controller";
import JwtParseMiddlewars from "../middlewars/JwtParseMiddlewars";

const route = Express.Router();

route.post("/auth/signup", CreateNewUser);
route.post("/auth/login", LoginUserByEmail);
route.get("/auth/me", JwtParseMiddlewars('user'), MyProfile);
route.get("/auth/my-info", JwtParseMiddlewars('user'), MyInfo);

route.get("/auth/my-admin", JwtParseMiddlewars('user'), MyAdmin);

const UserRoute = route;
export default UserRoute;