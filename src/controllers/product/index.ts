import {  Request, Response } from "express"
import status from 'http-status';


import { ApiError } from "@/constructors/error";
import { Product } from "@/db/products";
import { ProductService } from "@/services/product";
import { fieldsChecker } from "@/helpers/fields-checker";

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
    } = req.body;

    const newProduct = await Product.create({
        title,
        purchasePrice, 
        priceOfTransportation, 
        repairPreis,
        salePrice, 
        income
    })

    res.status(status.OK).send({
        product: newProduct,
    })
}

const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const {
        title,
        purchasePrice, 
        priceOfTransportation = 0, 
        repairPreis = 0,
        salePrice = 0, 
        income = 0
    } =  req.body;

    const product = await ProductService.findProductById(id);

    if (!product) {
        const error = ApiError.notFound({errors: `Product with ID: ${id} wasn't found.`})
        res.status(error.status).send({ msg: error.errors })
    }

    const updatedFieldsInProduct = fieldsChecker([
        ['title', title],
        ['purchasePrice', purchasePrice],
        ['priceOfTransportation', priceOfTransportation],
        ['repairPreis', repairPreis], 
        ['salePrice', salePrice],
        ['income', income]
    ])    

    const modifiedResult =  await ProductService.updateOneProduct(id, updatedFieldsInProduct);

    if (!modifiedResult.acknowledged) {
        const error = ApiError.notModified({error: 'not modified'});

        res
        .status(error.status)
        .send({msg: error.errors})
    }

    res.status(status.OK).send({
        msg: 'Succesfully modified',
    })
}

const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await ProductService.deleteProduct(id);
    
    if (!product) {
        const error = ApiError.notFound({errors: `Product with ID: ${id} wasn't found.`})
        res.status(error.status).send({ msg: error.errors })
    }

    res.status(status.OK).send({ msg: `Product with ID: ${id} was deleted`, data: product })
}

const deleteManyProducts = async (req: Request, res: Response) => {
    const { ids } = req.params;

    const arrayOfProductsId = ids.split(',');    

    const deletedCount = await ProductService.deleteProducts(arrayOfProductsId);

    if (!deletedCount) {
        const error = ApiError.notFound({errors: `Entities with IDs: ${arrayOfProductsId} weren't found`})

        res.status(error.status).send({
            msg: error.errors
        })
    }    

    res.status(status.OK).send({
        msg: `Entities with IDS: ${arrayOfProductsId} were deleted`
    })
}



export const productController = {
    addNewProduct,
    getAllProducts,
    deleteProduct,
    deleteManyProducts,
    updateProduct
}
