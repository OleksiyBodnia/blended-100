import { ProductCollection } from "../db/models/product.js";
import { createError } from "../utils/createError.js";
import { productsAddSchemas } from "../validation/productsSchemas.js";

export const createProduct = async (req, res, next) => {
  try {
    const {body, user} = req;
    
    const product = await ProductCollection.create({...body, owner: user._id});

    res.status(201).json({
      status: res.status,
      data: product,
      message: "Created product!",
    });
  } catch (error) {
    next(error);
  }
};

