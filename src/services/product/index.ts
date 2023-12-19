import { Product } from "@/db/products"

const findProductById = async (id: string) => {
    const product = await Product.findById(id)

    return product;
}

const deleteProduct = async (id: string) => {
    const deletedProduct = await Product.findByIdAndDelete(id);

    return deletedProduct;
}


const deleteProducts = async (ids: string[]) => {
    const deletedEntity = await Product.deleteMany({ _id: { $in: ids } })

    return deletedEntity.deletedCount;
}


const updateOneProduct = async (id: string, update: Record<string, unknown>) => {
    const updatedProduct = await Product.updateOne({ '_id': id }, { "$set": update });

    return updatedProduct;
}


export const ProductService = {
    findProductById,
    deleteProducts,
    deleteProduct,
    updateOneProduct
}
