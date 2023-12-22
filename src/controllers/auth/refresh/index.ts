import { ApiError } from "@/constructors/error";

import { Request, Response } from "express";
import { loginController } from "../login";
import { userModel } from "@/db/users";
import { userNormalize } from "@/helpers/user/normalize";
import { jwtService } from "@/services/auth/jwt";
import { RefreshToken } from "@/db/refresh";

const refresh = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const foundUser: any = await RefreshToken.findOne({
        refreshToken
    }).populate('userId').exec()
    
    const { email } = foundUser.userId;

    const userRefreshToken = jwtService.verifyRefreshToken(refreshToken);

    const token = await jwtService.getByToken(refreshToken);

    if (!userRefreshToken || !token) {
        const error = ApiError.unathorized({
            errors: 'invalid token'
        })

        res.status(+error.status).send({
            errors: error.errors
        })
    }

    const user = await userModel.findOne({email});

    const normalizeUserFields = userNormalize(user);

    await loginController.generateTokens(res, normalizeUserFields) 
}

export const refreshController = {
    refresh
}
