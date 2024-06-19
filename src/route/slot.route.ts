import Express from "express";
import { CreateSlot_Controller, GetAvilableSlot } from "../module/slot/slot.controller";
import vaildate_request_body from "../middlewars/vaildate_request_body";
import { SlotZod } from "../module/slot/slot.zod";

const route = Express.Router();

route.get("/slots/availability", GetAvilableSlot);

const SlotRoute = route;
export default SlotRoute;