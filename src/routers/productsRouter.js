import express from "express";
import * as ctrl from "../controllers/productControllers.js";
import { validateBody } from "../utils/validateBody.js";
import { productsAddSchemas } from "../validation/productsSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";

export const productsRouter = express.Router();

productsRouter.post("/", authenticate, validateBody(productsAddSchemas), ctrl.createProduct);
