import { Request, Response } from "express"
import catchAsync from "../../middlewars/catchAsync"
import { CreateNewUserByPayload, LoginUserByEmailService } from "./user.service"
import responseData from "../../middlewars/responseData";
import httpStatus from "http-status";
import { UserLoginZod, UserZod } from "./user.zod";
import { UserModel } from "./user.model";
import { ServiceModel } from "../service/service.model";
import { SlotModel } from "../slot/slot.model";
import { BookingModel } from "../booking/booking.model";

export const CreateNewUser = catchAsync(async (req: Request, res: Response) => {
    const vaildateUser = UserZod.parse(req.body);
    const result = await CreateNewUserByPayload(vaildateUser);
    res.send(responseData(true, httpStatus.OK, "User registered successfully", result))
});

export const LoginUserByEmail = catchAsync(async (req: Request, res: Response) => {
    const vaildateLoginInfo = UserLoginZod.parse(req.body);
    const result = await LoginUserByEmailService(vaildateLoginInfo);
    res.send(result);
});

export const MyProfile = catchAsync(async (req: Request, res: Response) => {
    const me = req?.user?.email;
    if (me) {
        const user = await UserModel.findOne({ email: me });
        if (user) {
            return res.send({
                success: true,
                statusCode: 200,
                message: "User found!",
                data: {
                    "ping": true
                }
            });
        } else {
            return res.send({
                success: true,
                statusCode: 200,
                message: "User is not found!",
                data: {
                    ping: false
                }
            });
        }
    } else {
        return res.send({
            success: true,
            statusCode: 200,
            message: "User is not found!",
            data: {
                ping: false
            }
        });
    }
})

export const MyInfo = catchAsync(async (req: Request, res: Response) => {
    const me = req?.user?.email;
    if (me) {
        const user = await UserModel.findOne({ email: me });
        console.log(user);

        if (user) {
            return res.send({
                success: true,
                statusCode: 200,
                message: "User found!",
                data: user
            });
        } else {
            return res.send({
                success: true,
                statusCode: 200,
                message: "User is not found!",
                data: user
            });
        }
    } else {
        return res.send({
            success: true,
            statusCode: 200,
            message: "User is not found!",
            data: []
        });
    }
})

export const MyAdmin = catchAsync(async (req: Request, res: Response) => {
    const me = req?.user?.email;

    if (me) {
        const user = await UserModel.findOne({ email: me });
        console.log(user);

        if (user?.role === 'admin') {
            return res.send({
                success: true,
                statusCode: 200,
                message: "Admin found!",
                data: {
                    "ping": true
                }
            });
        } else {
            return res.send({
                success: false,
                statusCode: 200,
                message: "User is not admin!",
                data: {
                    ping: false
                }
            });
        }
    } else {
        return res.send({
            success: true,
            statusCode: 200,
            message: "User is not found!",
            data: {
                ping: false
            }
        });
    }
});


export const UserList = catchAsync(async (req: Request, res: Response) => {
    const UserList = await UserModel.find({});
    return res.send(responseData(true, httpStatus.OK, "User List Retrive", UserList));
});

export const AppointAsAdmin = catchAsync(async (req: Request, res: Response) => {
    const id = req?.body?.id;
    const UserList = await UserModel.findByIdAndUpdate(id, { $set: { role: "admin" } });

    return res.send(responseData(true, httpStatus.OK, "User List Retrive", []));
});

export const AdminDashboard = catchAsync(async (req: Request, res: Response) => {
    const count = {
        user: await UserModel.estimatedDocumentCount(),
        booking: await BookingModel.estimatedDocumentCount(),
        service: (await ServiceModel.find({ isDeleted: false })).length,
        slot: (await SlotModel.find({ isBooked: "available" })).length,
    };

    const data = {
        user: await UserModel.find({}).limit(6).sort('-updatedAt'),
    }

    return res.send(responseData(true, httpStatus.OK, "Dashboard Data Retrive", { count, data }));
});