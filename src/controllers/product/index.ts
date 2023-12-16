import {  Request, Response } from "express"
import status from 'http-status';


import { ApiError } from "@/constructors/error";
import { Product } from "@/db/products";

const getAllProducts = async (req: Request, res: Response) => {
    const { offset = 0, limit = 20} = req.query;
    

    const convertedLimitToNumber = +limit;
    const convertedOffsetToNumber = +offset;

    const arrayOfAllProducts = await Product.find()
        .skip(convertedOffsetToNumber)
        .limit(convertedLimitToNumber);

        const productsCount = await Product.countDocuments();

        const totalPages = Math.ceil(productsCount / convertedLimitToNumber);
        const currentPage = Math.ceil(productsCount % convertedOffsetToNumber);

    if (!arrayOfAllProducts) {
        const error = ApiError.badRequest('entities dont exists', {
            error: 'error'
        })
        res.status(error.status).send({
            error: error.errors,
            message: error.message
        });
    }

    res.status(status.OK).send({
        data: arrayOfAllProducts,
        paging: {
            total: productsCount,
            page: currentPage,
            pages: totalPages,
        },
    });
}

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

    const formatedProduct: Record<string, unknown> = arrayOfValues.reduce((acc, el) => {
        return {
            ...acc, 
            [el[0]]: el[1],
        }
    }, {})

    arrayOfValues.forEach((field) => {        
        if (!formatedProduct[field[0]]  && formatedProduct[field[0]] !== 0) {
            const error = ApiError.unProcessableEntity({'errors': `you should provide ${field[0]} value`})
            res.status(error.status).send(
                {
                    msg: error.message,
                    errors: error.errors
                }
            )
        }
    })

    const newProduct = await Product.create(formatedProduct)

    res.status(status.OK).send({
        product: newProduct,
    })
}


export const productController = {
    addNewProduct,
    getAllProducts
}
