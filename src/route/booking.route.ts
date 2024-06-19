import Express from "express";
import { CreateBooking, GetAllBooking, MyBooking } from "../module/booking/booking.controller";
import vaildate_request_body from "../middlewars/vaildate_request_body";
import BookingZod from "../module/booking/booking.zod";
import JwtParseMiddlewars from "../middlewars/JwtParseMiddlewars";

const route = Express.Router();

route.post("/bookings", vaildate_request_body(BookingZod), CreateBooking);
route.get("/bookings", JwtParseMiddlewars('admin'), GetAllBooking);
route.get("/my-bookings",JwtParseMiddlewars('user'), MyBooking);

const BookingRoute = route;
export default BookingRoute;