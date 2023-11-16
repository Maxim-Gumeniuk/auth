import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
    error: Error | null = null, 
    req: Request, res: Response, 
    next: NextFunction
    ) => {
    if (error) {
        res.send({
            msg: 'Server error'
        })
    }

    next()
}
