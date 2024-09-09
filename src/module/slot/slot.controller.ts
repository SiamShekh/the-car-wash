import { RequestHandler } from "express";
import catchAsync from "../../middlewars/catchAsync";
import { SlotZod } from "./slot.zod";
import { CreateSlot_Service, GetAvilableSlots } from "./slot.services";
import responseData from "../../middlewars/responseData";
import httpStatus from "http-status";
import { SlotModel } from "./slot.model";

export const CreateSlot_Controller: RequestHandler = catchAsync(async (req, res) => {
    const result = await CreateSlot_Service(req.body);
    return res.send(responseData(true, httpStatus.OK, 'Slots created successfully', result))
});

export const GetAvilableSlot: RequestHandler = catchAsync(async (req, res) => {
    const result = await GetAvilableSlots(req.query);
    return res.send(result.length ? responseData(true, httpStatus.OK, 'Available slots retrieved successfully', result) : responseData(true, httpStatus.OK, 'No Data Found!', result))
});

export const GetAvilableSlotAdmin: RequestHandler = catchAsync(async (req, res) => {
    const result = await SlotModel
        .find({service: req?.query?.serviceId})
        .populate('service');

    return res.send(result.length ? responseData(true, httpStatus.OK, 'Available slots retrieved successfully', result) : responseData(true, httpStatus.OK, 'No Data Found!', result))
});

export const SingleSlotInformission: RequestHandler = catchAsync(async (req, res) => {
    const result = await SlotModel.findById(req?.query?.id)
        .populate("service");
    return res.send(result ? responseData(true, httpStatus.OK, ' slots retrieved successfully', result) : responseData(true, httpStatus.OK, 'No Data Found!', []))
});
