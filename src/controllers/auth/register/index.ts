import { NextFunction, Request, Response } from "express";

import { userModel } from "@/db/users";
import { normalizeUser } from "@/helpers/normalize-user";

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {

    const { email, password } = req.body;

    const newUser = new userModel({
        email,
        password,
    })

    await  newUser.save();
    res.send({
        user: normalizeUser(newUser),
        message: 'new user created'
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
