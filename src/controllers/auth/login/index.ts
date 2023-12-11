import { Request, Response } from "express";

import { userNormalize } from "@/helpers/user/normalize";
import { getUserByEmail } from "@/helpers/user/getUserByEmail";
import { ApiError } from "@/constructors/error";
import { bcryptService } from "@/services/auth/bcrypt";
import { jwtService } from "@/services/auth/jwt";

const generateTokens = async (res: Response, user: any) => {
    const normalizeFieldsInUser = userNormalize(user);

    const accesToken = jwtService.generateJwt(normalizeFieldsInUser);

    const refreshToken = jwtService.generateRefreshJwt(normalizeFieldsInUser);
    
    await jwtService.save(normalizeFieldsInUser._id, refreshToken!);    

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    res.send({
        user: normalizeFieldsInUser,
        accesToken
    })
}

const userLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
        const error = ApiError.unathorized({ error: 'user doesnt exist' });

        res.status(+error.status).send({
            msg: error.message,
            errors: error.errors
        })
    }

    const comparePass = await bcryptService.comparePass(user.password, password);

    if (!comparePass) {
        const error = ApiError.unathorized({ error: 'incorect password!' });
        
        res.status(error.status).send({
            msg: error.message,
            errors: error.errors
        })
    }

    await generateTokens(res, user);
}

export const main = async (req: Request, res: Response) => {
    res.send({
        msg: 'hello!'
    })
}

export const loginController = {
    userLogin,
    main,
    generateTokens
}
