import { createError } from "./createError.js";

export const validateBody = (schema) => {
  return async function (req, res, next) {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      next(createError(400, error.message));
    }
  };
};
