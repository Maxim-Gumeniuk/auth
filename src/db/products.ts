import { usersDb } from "./connection";

const productSchema = usersDb.createSchema(
    {
        title: {
        type: String,
        required: true,
        lowercase: true,
        min: [2, "it should product title"],
        },
        purchasePrice: {
            type: Number,
            required: true,
        },
        priceOfTransportation: {
            type: Number,
        },
        repairPreis: {
            type: Number,
        },
        salePrice: {
            type: Number,
        },
        income: {
            type: Number,
        }
    }
)

export const Product = usersDb.createModel('product', productSchema);
