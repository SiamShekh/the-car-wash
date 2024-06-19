import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError, any } from "zod";

const GlobalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    
    
    if (err.code === 11000) {
        return res.send({
            "success": false,
            "statusCode": httpStatus.BAD_REQUEST,
            "message": err.errorResponse.errmsg || "some thing went wrong",
            "data": []
        })
    }

    if (err.name === 'ValidationError') {
        return res.send({
            "success": false,
            "statusCode": httpStatus.BAD_REQUEST,
            "message": err.message || "some thing went wrong",
            "data": []
        })
    }

    if (err instanceof ZodError) {
        const error: any = [];
        
        err?.issues?.map(data => {
            const shortError = {
                code: data?.code,
                message: data?.message,
            };
            error.push(shortError);
        })
        return res.send({
            "success": false,
            "statusCode": httpStatus.BAD_REQUEST,
            "message": error || "some thing went wrong",
            "data": []
        })
    }

    console.log(err);
    
    return res.send({
        "success": false,
        "statusCode": httpStatus.NOT_FOUND,
        "message": err.message || "some thing went wrong",
        "data": []
    })
};

export default GlobalErrorHandler; 