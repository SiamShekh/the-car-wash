import Express from "express";
import { CreateReview, GetReview } from "../module/review/review.controller";
import JwtParseMiddlewars from "../middlewars/JwtParseMiddlewars";

const route = Express.Router();

route.post("/review/create-review", JwtParseMiddlewars('user'), CreateReview);
route.get("/review", GetReview);

const ReviewRoute = route;
export default ReviewRoute;