import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import _ENV from "../config/config";
import { UserModel } from "../module/user/user.model";
import catchAsync from "./catchAsync";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

const JwtParseMiddlewars = (role: string) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const headers = req.headers.authorization?.split(' ')[1];

        if (headers) {
            const decode = await jwt.verify(headers as string, "amiscrectbolsitomik") as JwtPayload;
            const isUser = await UserModel.findOne({ email: decode?.email });

            if (isUser?.role === decode?.role) {
                if ((role === 'admin' && isUser?.role === 'admin') ||
                    (role === 'user' && (isUser?.role === 'user' || isUser?.role === 'admin'))) {
                    req.user = isUser;
                    next();
                } else {
                    throw new Error('You are not authorized!');
                }
            } else {
                throw new Error('You are not authorized!');
            }

        } else {
            throw new Error('Auth token is undefined or your are a unauthraized guy!')
        }
    })
}

export default JwtParseMiddlewars;