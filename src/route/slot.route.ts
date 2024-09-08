import Express from "express";
import { GetAvilableSlot, SingleSlotInformission } from "../module/slot/slot.controller";

const route = Express.Router();

route.get("/slots/availability", GetAvilableSlot);
route.get("/slots", SingleSlotInformission);

const SlotRoute = route;
export default SlotRoute;