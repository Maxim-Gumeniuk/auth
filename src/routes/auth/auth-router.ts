import express from 'express';

import { registrationController } from '@/controllers/auth/register/index';
import { authLinks } from '@/types/routes/registration/index';
import { validateCredentials } from '@/middlewares/validate/auth';
import { loginController } from '@/controllers/auth/login';
import { errorHandler } from '@/helpers/error/errorHandler';
import { refreshController } from '@/controllers/auth/refresh';
import { logOutController } from '@/controllers/auth/logout';
import { activateMiddleware, authMiddleware } from '@/middlewares/auth';

export const authRouter = express.Router();

authRouter.post(
    authLinks.registration,
    validateCredentials,
    errorHandler(registrationController.register)
);

authRouter.post(
    authLinks.login,
    validateCredentials,
    activateMiddleware,
    errorHandler(loginController.userLogin)
)

authRouter.post(
    authLinks.refresh,
    authMiddleware,
    errorHandler(refreshController.refresh)
)

authRouter.get(
    authLinks.logout,
    errorHandler(logOutController.logOut)
)
