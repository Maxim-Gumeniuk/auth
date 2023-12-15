import express from "express";

import { productController } from "@/controllers/product";
import { errorHandler } from "@/helpers/error/errorHandler";
import { authMiddleware } from "@/middlewares/auth";
import { productLinks } from "@/types/routes/product";

export const productRouter = express.Router()

/// authMiddleware
productRouter.post(productLinks.addProduct, errorHandler(productController.addNewProduct));
