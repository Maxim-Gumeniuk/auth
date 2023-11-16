import { Request, Response } from "express";

const main = (req: Request, res: Response) => {
    res.send({
        msg: 'Hello user!'
    })
}


export const testController = {
    main,
}