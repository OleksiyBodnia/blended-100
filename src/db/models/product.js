import { model, Shema } from "mongoose";

const productShema = new Shema(
    {
        name: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const ProductCollection = model("product", productShema);