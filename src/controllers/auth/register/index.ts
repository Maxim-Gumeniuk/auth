import { NextFunction, Request, Response } from "express";

import { userModel } from "@/db/users";
import { newBot } from "@/services/telegram";

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {

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

    res.send({
        newUser,
        message: 'new user was created'
    });
} catch(e) {
    console.log(e);

    const error = new Error(e as string);

    res.send(error.message)
    }
}

export const registrationController = {
    register,
}
