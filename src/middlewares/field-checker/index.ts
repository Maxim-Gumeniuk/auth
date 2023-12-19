import { NextFunction, Request, Response } from "express";

import { ApiError } from "@/constructors/error";

export const fieldChecker = (array: string[]) => (req: Request, res: Response, next: NextFunction) => {
    array.forEach((element) => { 
        if (!req.body[element]) {
 
            const error = ApiError.unProcessableEntity({'errors': `you should provide ${element} value`});

            res.status(error.status).send(
                {
                    msg: error.message,
                    errors: error.errors
                }
            )
        }
    });

    next()
}
