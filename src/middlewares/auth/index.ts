import { NextFunction, Request, Response } from "express";

import { getUserByEmail } from "@/helpers/user/getUserByEmail";
import { ApiError } from "@/constructors/error";
import { isAuth } from "@/helpers/token/isAuth";
import { jwtService } from "@/services/auth/jwt";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers['authorization'] || '';
        const [, token] = authorization.split(' ');

        const userIsAuth = isAuth(authorization, token, jwtService.verifyToken(token)!);

        if (!userIsAuth) {
            const error = ApiError.unathorized({
                error: 'not authorized'
            });
            
            return res.status(error.status).send({
                message: error.message,
                error: error.errors
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};


export const activateMiddleware = async (req: Request, res: Response, next: NextFunction) =>  {
    try {
        const { email } = req.body;

        const user: any = await getUserByEmail(email);
    
        if (user && !user.activateToken) {
            const error = ApiError.unathorized({ error: 'you should activate your account!' });
        
            res.status(error.status).send({
                msg: error.message,
                errors: error.errors
            })
        }

        next()
    } catch(e) {
        next(e)
    }
}
