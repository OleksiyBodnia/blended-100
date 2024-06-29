import Joi from "joi";

export const productsAddSchemas = Joi.object({
  name: Joi.string().max(64).required(),
  price: Joi.number().min(0).required(),
});
