import express from 'express';

import { registrationController } from '@/controllers/auth/register/index';
import { RegistrationLinks } from '@/types/routes/registration/index';
import { validateCredentials } from '@/middlewares/validate/auth';

export const authRouter =  express.Router();

authRouter.post(
    RegistrationLinks.registration,
    validateCredentials,
    registrationController.register
);
