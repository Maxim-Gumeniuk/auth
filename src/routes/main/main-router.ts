import { testController } from "@/controllers/main";
import { mainLinks } from "@/types/routes/main";
import express from "express";

export const mainRouter = express.Router();

mainRouter.get(mainLinks.main, testController.main);
