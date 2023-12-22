import express from "express";

import { productController } from "@/controllers/product";
import { errorHandler } from "@/helpers/error/errorHandler";
import { authMiddleware } from "@/middlewares/auth";
import { productLinks } from "@/types/routes/product";
import { fieldChecker } from "@/middlewares/field-checker";

export const productRouter = express.Router()

/// authMiddleware
productRouter.get(productLinks.allProducts, authMiddleware, errorHandler(productController.getAllProducts));
productRouter.post(productLinks.addProduct,fieldChecker(['title', 'purchasePrice']), errorHandler(productController.addNewProduct));
productRouter.delete(`${productLinks.product}/:id`, productController.deleteProduct);
productRouter.delete(`${productLinks.allProducts}/:ids`, productController.deleteManyProducts);
productRouter.put(`${productLinks.product}/:id`, productController.updateProduct)
