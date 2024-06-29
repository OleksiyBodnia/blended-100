import { ProductCollection } from "../db/models/product.js";
import { createError } from "../utils/createError.js";
import { productsAddSchemas } from "../validation/productsSchemas.js";

export const createProduct = async (req, res, next) => {
  try {
    const product = await ProductCollection.create(req.body);

    res.status(201).json({
      status: res.status,
      data: product,
      message: "Created product!",
    });
  } catch (error) {
    next(error);
  }
};
