import { Request, Response } from "express"
import catchAsync from "../../middlewars/catchAsync"
import { CreateNewUserByPayload, LoginUserByEmailService } from "./user.service"
import responseData from "../../middlewars/responseData";
import httpStatus from "http-status";
import { UserLoginZod, UserZod } from "./user.zod";

export const CreateNewUser = catchAsync(async (req: Request, res: Response) => {
    const vaildateUser = UserZod.parse(req.body);
    const result = await CreateNewUserByPayload(vaildateUser);
    res.send(responseData(true, httpStatus.OK, "User registered successfully", result))
});

export const LoginUserByEmail = catchAsync(async (req: Request, res: Response) => {
    const vaildateLoginInfo = UserLoginZod.parse(req.body);
    const result = await LoginUserByEmailService(vaildateLoginInfo);
    res.send(result);
})
