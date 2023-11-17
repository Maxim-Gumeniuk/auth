import { Request, Response } from "express";

import { userNormalize } from "@/helpers/user/normalize";
import { jwtService } from "@/services/jwt";
import { loginService } from "@/services/login";

const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await loginService.getUserByEmail(email);

    if (!user || password !== user.password) {
        res.status(401).send({
            msg: 'not authorized!'
        })
    }
    const normalizeFieldsInUser = userNormalize(user)
    const accesToken = jwtService.generateJwt(user);

    res.send({
        user: normalizeFieldsInUser,
        accesToken
    })
}

export const main = (req: Request, res: Response) => {
    res.send({
        msg: 'hello!'
    })
}

export const loginController = {
    userLogin,
    main
}
