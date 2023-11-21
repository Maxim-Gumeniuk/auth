import { NextFunction, Request, Response } from "express";
import { registerService } from "@/services/register";
import { ApiError } from "@/constructors/error";

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await registerService.register(email, password);

    if (!user) {
        const error = ApiError.badRequest('user already exist', {
            message: 'email already in used'
        })

        res.status(+error.status).send(error.message)
    } 
    res.send({
        user,
        message: 'new user was created'
    });
}

export const registrationController = {
    register,
}
