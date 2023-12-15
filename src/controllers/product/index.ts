import {  Request, Response } from "express"
import status from 'http-status';

import { product } from "@/db/products";
import { ApiError } from "@/constructors/error";

const addNewProduct = async (req: Request, res: Response) => {
    const { 
        title,
        purchasePrice, 
        priceOfTransportation = 0, 
        repairPreis = 0,
        salePrice = 0, 
        income = 0
    } = req.body || {};

    const arrayOfValues = [
    ['title', title],
    ['purchasePrice', purchasePrice], 
    ['priceOfTransportation', priceOfTransportation], 
    ['repairPreis', repairPreis], 
    ['salePrice', salePrice], 
    ['income', income]
    ];

    const formatedProduct: any = arrayOfValues.reduce((acc, el) => {
        return {
            ...acc, 
            [el[0]]: el[1],
        }
    }, {})

    arrayOfValues.forEach((field) => {        
        if (!formatedProduct[field[0]] && formatedProduct[field[0]] !== 0) {
            const error = ApiError.unProcessableEntity({'errors': `you should provide ${field[0]} value`})
            res.status(error.status).send(
                {
                    msg: error.message,
                    errors: error.errors
                }
            )
        }
    })

    const newProduct = await product.create(formatedProduct)

    res.status(status.OK).send({
        product: newProduct,
    })
}


export const productController = {
    addNewProduct
}
