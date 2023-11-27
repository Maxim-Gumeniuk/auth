import { NextFunction, Request, Response } from "express";
import status from 'http-status';

export const errorMiddleware = (
    error: Error | null = null, 
    req: Request, res: Response, 
    next: NextFunction
    ) => {

    res.status(status.INTERNAL_SERVER_ERROR).send({
        msg: 'Server error'
    })

    next()
}
