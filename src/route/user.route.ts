import Express from "express";
import { AdminDashboard, AppointAsAdmin, CreateNewUser, LoginUserByEmail, MyAdmin, MyInfo, MyProfile, UserList } from "../module/user/user.controller";
import JwtParseMiddlewars from "../middlewars/JwtParseMiddlewars";

const route = Express.Router();

route.post("/auth/signup", CreateNewUser);
route.post("/auth/login", LoginUserByEmail);
route.get("/auth/me", JwtParseMiddlewars('user'), MyProfile);
route.get("/auth/my-info", JwtParseMiddlewars('user'), MyInfo);

route.get("/auth/my-admin", JwtParseMiddlewars('user'), MyAdmin);
route.get("/admin/user-list", JwtParseMiddlewars('admin'), UserList);
route.post("/admin/appoint-admin", JwtParseMiddlewars('admin'), AppointAsAdmin);
route.get("/admin/dashboard-info", JwtParseMiddlewars('admin'), AdminDashboard);

const UserRoute = route;
export default UserRoute;