import Express from "express";
import { GetAvilableSlot, GetAvilableSlotAdmin, SingleSlotInformission } from "../module/slot/slot.controller";

const route = Express.Router();

route.get("/slots/availability", GetAvilableSlot);
route.get("/slots", SingleSlotInformission);
route.get("/admin/slots", GetAvilableSlotAdmin);

const SlotRoute = route;
export default SlotRoute;