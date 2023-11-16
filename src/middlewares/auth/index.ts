import { NextFunction, Request, Response } from "express";

import { jwtService } from "@/services/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization'] || '';
    const [, token] = authorization.split(' ');

    if (!authorization || !token) {
        res.send({
            msg: 'not auth'
        })
    }

    if (!jwtService.verifyToken(token)) {
        res.send({
            msg: 'not auth'
        })
    }
    ///401
    next()
}
