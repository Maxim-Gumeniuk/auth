import { NextFunction, Request, Response } from "express";

import { userModel } from "@/db/users";
import { newBot } from "@/services/telegram";
import { userNormalize } from "@/helpers/user/normalize";

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const newUser = new userModel({
        email,
        password,
        activateToken: 'waiting for activate'
    })

    await Promise.all([ 
        newBot(),  
        newUser.save()
    ]);

    const user = userNormalize(newUser)
    res.send({
        user,
        message: 'new user was created'
    });
}

export const registrationController = {
    register,
}
