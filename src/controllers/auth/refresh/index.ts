import { ApiError } from "@/constructors/error";
import { jwtService } from "@/services/jwt";
import { Request, Response } from "express";
import { loginController } from "../login";
import { userModel } from "@/db/users";
import { normalizeUser } from "@/helpers/normalize-user";

const refresh = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const { email } = req.body;

    const userRefreshToken = jwtService.verifyRefreshToken(refreshToken);

    const token = await jwtService.getByToken(refreshToken);

    if (!userRefreshToken || !token) {
        const error = ApiError.unathorized({
            errors: 'invalid token'
        })

        res.status(error.status).send({
            errors: error.errors
        })
    }

    const user = userModel.findOne(email);
    const normalizeUserFields = normalizeUser(user)

    await loginController.generateTokens(res, normalizeUserFields) 
    // should change logic
}


export const refreshController = {
    refresh
}
