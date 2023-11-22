import { ApiError } from "@/constructors/error";
import { jwtService } from "@/services/auth/jwt";
import { logoutService } from "@/services/auth/logout";
import { Request, Response } from "express";

const logOut = async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const userData = jwtService.verifyRefreshToken(refreshToken);

    if (!userData || !refreshToken) {
        const error = ApiError.unathorized({
            errors: 'user not auth'
        })

        res.status(error.status).send(error.message)
    }

    await logoutService.removeToken(refreshToken.userId);

    res.send({
        msg: 'success logout'
    })
}


export const logOutController = {
    logOut,
}
