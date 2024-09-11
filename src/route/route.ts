import Express from "express";
import { CreateNewUser, LoginUserByEmail } from "../module/user/user.controller";
import UserRoute from "./user.route";
import ServiceRoute from "./service.route";
import SlotRoute from "./slot.route";
import { GetAvilableSlot } from "../module/slot/slot.controller";
import BookingRoute from "./booking.route";
import ReviewRoute from "./review.route";
import PaymentRoute from "./payment.route";

const route = Express.Router();

route.use(UserRoute);
route.use(ServiceRoute);
route.use(SlotRoute);
route.use(BookingRoute);
route.use(ReviewRoute);
route.use(PaymentRoute);

export default route;