import Express from "express";
import { GetAvilableSlot } from "../module/slot/slot.controller";

const route = Express.Router();

route.get("/slots/availability", GetAvilableSlot);

const SlotRoute = route;
export default SlotRoute;