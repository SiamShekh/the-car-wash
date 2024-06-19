import { RequestHandler } from "express";
import catchAsync from "../../middlewars/catchAsync";
import { SlotZod } from "./slot.zod";
import { CreateSlot_Service, GetAvilableSlots } from "./slot.services";
import responseData from "../../middlewars/responseData";
import httpStatus from "http-status";

export const CreateSlot_Controller: RequestHandler = catchAsync(async (req, res) => {
    const result = await CreateSlot_Service(req.body);
    return res.send(responseData(true, httpStatus.OK, 'Slots created successfully', result))
});

export const GetAvilableSlot: RequestHandler = catchAsync(async (req, res) => {
    const result = await GetAvilableSlots(req.query);
    return res.send(responseData(true, httpStatus.OK, 'Available slots retrieved successfully', result))
})