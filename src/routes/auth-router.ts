import express from 'express';

import { registrationController } from '@/controllers/auth/registr/index';
import { Registration } from '@/types/routes/registration/index';

export const authRouter =  express.Router();

authRouter.post(Registration.registration, registrationController.registr);
