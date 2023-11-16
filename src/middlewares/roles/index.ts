import { NextFunction, Request, Response } from "express";

import { jwtService } from "@/services/jwt";
import { JwtPayload } from "jsonwebtoken";
import { Roles } from "@/types/roles";

export const rolesChecker = (roles: Array<string>) => (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers['authorization'] || '';
    const [, token] = authorization.split(' ');

    const decoded =  jwtService.verifyToken(token) as JwtPayload;

    const { role } = decoded;

    if (!roles.includes(role)) {
        res.send({
            msg: 'you shall not pass'
        })
    }

    next()
}
