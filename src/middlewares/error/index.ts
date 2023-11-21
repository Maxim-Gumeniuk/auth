import { NextFunction, Request, Response } from "express";
import status from 'http-status';

import { ApiError } from "@/constructors/error";


export const errorMiddleware = (
    error: Error | null = null, 
    req: Request, res: Response, 
    next: NextFunction
    ) => {

    if (error instanceof ApiError) {
        res.status(+error.status).send({
            message: error.message,
            errors: error.errors
        })

    } else {
        res.status(status.INTERNAL_SERVER_ERROR).send({
            msg: 'Server error'
        })
    }

    next()
}
