import Express from "express";
import { CreateNewUser, LoginUserByEmail } from "../module/user/user.controller";
import UserRoute from "./user.route";
import ServiceRoute from "./service.route";
import SlotRoute from "./slot.route";
import { GetAvilableSlot } from "../module/slot/slot.controller";
import BookingRoute from "./booking.route";

const route = Express.Router();

route.use(UserRoute);
route.use(ServiceRoute);
route.use(SlotRoute);
route.use(BookingRoute);

export default route;