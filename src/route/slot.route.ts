import Express from "express";
import { ChangeSlotsStatus, GetAvilableSlot, GetAvilableSlotAdmin, SingleSlotInformission } from "../module/slot/slot.controller";
import JwtParseMiddlewars from "../middlewars/JwtParseMiddlewars";

const route = Express.Router();

route.get("/slots/availability", GetAvilableSlot);
route.get("/slots", SingleSlotInformission);
route.get("/admin/slots", GetAvilableSlotAdmin);
route.put("/admin/changed/slots", JwtParseMiddlewars('admin'), ChangeSlotsStatus);

const SlotRoute = route;
export default SlotRoute;