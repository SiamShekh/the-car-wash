import { RequestHandler } from "express";
import catchAsync from "../../middlewars/catchAsync";
import { ServiceZod } from "./service.zod";
import { CreateService_Service, DeleteService_Service, GetAllService_Service, GetAllService_ServiceAdmin, GetSingleDataByID, UpdateService_Service } from "./services.service";
import responseData from "../../middlewars/responseData";
import httpStatus from "http-status";

export const CreateService: RequestHandler = catchAsync(async (req, res) => {
    const vaildateZod = await ServiceZod.parse(req.body);
    const result = await CreateService_Service(vaildateZod);
    return res.send(responseData(true, httpStatus.OK, 'Service created successfully', result))
})


export const GetSingleServiceByID: RequestHandler = catchAsync(async (req, res) => {
    const ID = req.params.id;
    const result = await GetSingleDataByID(ID);
    return res.send(responseData(true, httpStatus.OK, 'Service retrieved successfully', result as {}))
})

export const GetAllServiceController: RequestHandler = catchAsync(async (req, res) => {
    const result = await GetAllService_Service(req?.query);
    return res.send(responseData(true, httpStatus.OK, 'Service retrieved successfully', result as {}))
})

export const GetAllServiceControllerAdmin: RequestHandler = catchAsync(async (req, res) => {
    const result = await GetAllService_ServiceAdmin(req?.query);
    return res.send(responseData(true, httpStatus.OK, 'Service retrieved successfully', result as {}))
})

export const UpdateServiceController: RequestHandler = catchAsync(async (req, res) => {
    const result = await UpdateService_Service(req.params.id, req.body);
    return res.send(responseData(true, httpStatus.OK, 'Service update successfully', result as {}))
})


export const DeleteServiceController: RequestHandler = catchAsync(async (req, res) => {
    const result = await DeleteService_Service(req.params.id);
    return res.send(responseData(true, httpStatus.OK, 'Service retrieved successfully', result as {}))
})