import { Request, Response } from "express";
import catchAsync from "../../middlewars/catchAsync";
import { ReviewModel } from "./review.model";
import responseData from "../../middlewars/responseData";
import httpStatus from "http-status";

export const CreateReview = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewModel.create(req?.body);
    res.send(responseData(true, httpStatus.OK, 'Review Created', result as {}))
});

export const GetReview = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewModel
        .find({})
        .populate('user');
    res.send(responseData(true, httpStatus.OK, 'Service retrieved successfully', result as {}))
});