import express from 'express';

import { registrationController } from '@/controllers/auth/register/index';
import { authLinks } from '@/types/routes/registration/index';
import { validateCredentials } from '@/middlewares/validate/auth';
import { loginController } from '@/controllers/auth/login';
import { errorHandler } from '@/helpers/error/errorHandler';

export const authRouter =  express.Router();

authRouter.post(
    authLinks.registration,
    validateCredentials,
    errorHandler(registrationController.register)
);

authRouter.post(
    authLinks.login,
    validateCredentials,
    errorHandler(loginController.userLogin)
)
