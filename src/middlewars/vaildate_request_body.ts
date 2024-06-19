import { NextFunction, Request, RequestHandler, Response } from "express";
import catchAsync from "./catchAsync";
import { AnyZodObject } from "zod";

const vaildate_request_body = (schema: AnyZodObject) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        await schema.parseAsync(req.body);

        next();
    });
};

export default vaildate_request_body;