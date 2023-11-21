import express from "express";

import { loginController } from "@/controllers/auth/login";
import { errorHandler } from "@/helpers/error/errorHandler";
import { authMiddleware } from "@/middlewares/auth";
import { rolesChecker } from "@/middlewares/roles";

export const mainRouter = express.Router()

mainRouter.get('/', authMiddleware, rolesChecker(['user']), errorHandler(loginController.main))
