import Express from "express";
import { CreateService, DeleteServiceController, GetAllServiceController, GetSingleServiceByID, UpdateServiceController } from "../module/service/service.controller";
import JwtParseMiddlewars from "../middlewars/JwtParseMiddlewars";
import SlotRoute from "./slot.route";
import vaildate_request_body from "../middlewars/vaildate_request_body";
import { SlotZod } from "../module/slot/slot.zod";
import { CreateSlot_Controller } from "../module/slot/slot.controller";

const route = Express.Router();

route.post("/services", JwtParseMiddlewars('admin'), CreateService);
route.get("/services/:id", GetSingleServiceByID);
route.get("/services", GetAllServiceController);
route.put("/services/:id", JwtParseMiddlewars('admin'), UpdateServiceController);
route.delete("/services/:id", JwtParseMiddlewars('admin'), DeleteServiceController);

route.post("/services/slots", JwtParseMiddlewars('admin'), vaildate_request_body(SlotZod), CreateSlot_Controller);


const ServiceRoute = route;
export default ServiceRoute;