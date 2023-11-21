import { ApiError } from "@/constructors/error";
import { Statuses } from "@/types/statuses";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
    error: Error | null = null, 
    req: Request, res: Response, 
    next: NextFunction
    ) => {

    if (error instanceof ApiError) {
        res.status(error.status).send({
            message: error.message,
            errors: error.errors
        })
    }
    if (error) {
        res.status(Statuses.SERVER_ERROR).send({
            msg: 'Server error'
        })
    }

    next()
}
