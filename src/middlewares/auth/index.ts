import { NextFunction, Request, Response } from "express";

import { jwtService } from "@/services/jwt";
import { loginService } from "@/services/login";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization'] || '';
    const [, token] = authorization.split(' ');

    const { email } = req.body;

    const user: any = loginService.getUserByEmail(email);

    if (!user.activateToken) {
        res.send({
            msg: 'not auth'
        })
    }

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
