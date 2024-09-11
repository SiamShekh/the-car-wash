import httpStatus from "http-status";
import _ENV from "../../config/config";
import responseData from "../../middlewars/responseData";
import { TUser, TUserLogin } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const CreateNewUserByPayload = async (payload: TUser) => {
    const { password } = payload;
    const hash = await bcrypt.hash(password as string, 10)
    const result = await UserModel.create({ ...payload, password: hash });
    return result;
}

export const LoginUserByEmailService = async (payload: TUserLogin) => {
    const userExits = await UserModel.findOne({ email: payload.email });
    if (userExits) {
        const passwordCompare = await bcrypt.compare(payload.password as string, userExits?.password as string);
        if (passwordCompare) {
            const JWT_Payload = {
                email: userExits?.email,
                role: userExits?.role
            }
            const token = jwt.sign(JWT_Payload, "amiscrectbolsitomik", { expiresIn: '7d' });
            return {
                "success": true,
                "statusCode": 200,
                "message": "User logged in successfully",
                "token": token,
                "data": userExits
            }
        }else {
        throw new Error("Password is not matching...");
        }
    } else {
        throw new Error("user are not exits.");
    }
}


