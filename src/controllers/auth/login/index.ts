import { Request, Response } from "express";

import { userNormalize } from "@/helpers/user/normalize";
import { jwtService } from "@/services/jwt";
import { getUserByEmail } from "@/helpers/user/getUserByEmail";
import { ApiError } from "@/constructors/error";
import { bcryptService } from "@/services/bcrypt";

const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    const comparePass = bcryptService.comparePass(password, user.password);

    if (!user || !comparePass) {
        const error = ApiError.unathorized({error: 'user doesnt exist or incorect password!'});

        res.status(error.status).send({
            msg: error.message,
            errors: error.errors
        })
    }

    const normalizeFieldsInUser = userNormalize(user)
    const accesToken = jwtService.generateJwt(user);

    res.send({
        user: normalizeFieldsInUser,
        accesToken
    })
}

export const main = async (req: Request, res: Response) => {
    res.send({
        msg: 'hello!'
    })
}

export const loginController = {
    userLogin,
    main
}
