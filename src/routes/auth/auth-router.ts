import express from 'express';

import { registrationController } from '@/controllers/auth/register/index';
import { authLinks } from '@/types/routes/registration/index';
import { validateCredentials } from '@/middlewares/validate/auth';
import { loginController } from '@/controllers/auth/login';
import { errorHandler } from '@/helpers/error/errorHandler';
import { authMiddleware } from '@/middlewares/auth';
import { refreshController } from '@/controllers/auth/refresh';

export const authRouter =  express.Router();

authRouter.post(
    authLinks.registration,
    validateCredentials,
    errorHandler(registrationController.register)
);

authRouter.post(
    authLinks.login,
    validateCredentials,
    // authMiddleware,
    errorHandler(loginController.userLogin)
)

authRouter.post(
    authLinks.refresh,
    // validateCredentials,
    // authMiddleware,
    errorHandler(refreshController.refresh)
)
