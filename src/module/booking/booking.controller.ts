import { RequestHandler } from "express";
import catchAsync from "../../middlewars/catchAsync";
import { CreateBooking_Service, GetAllBookingService, GetMyBookingData } from "./booking.service";
import responseData from "../../middlewars/responseData";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";


export const CreateBooking: RequestHandler = catchAsync(async (req, res) => {
    const payload = {
        customerId: req?.user?._id,
        ...req.body
    }
    
    const result = await CreateBooking_Service(payload);

    return res.send(responseData(true, httpStatus.OK, 'Booking successful', result as {}));
});

export const GetAllBooking: RequestHandler = catchAsync(async (req, res) => {
    const result = await GetAllBookingService();
    return res.send(responseData(true, httpStatus.OK, 'All bookings retrieved successfully', result as {}));
})

export const MyBooking: RequestHandler = catchAsync(async (req, res) => {
    const result = await GetMyBookingData(req.user);
    return res.send(responseData(true, httpStatus.OK, 'User bookings retrieved successfully', result as {}));
})