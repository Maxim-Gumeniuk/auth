import { NextFunction, Request, Response } from "express"

export const errorHandler = (func: any) => {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            await func(req, res, next)
        } catch(e) {
            next(e)
        }
    }
}
