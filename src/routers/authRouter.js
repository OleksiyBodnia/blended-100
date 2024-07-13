import { Router } from "express";
import { registerUser } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post('/register', registerUser);

export { authRouter };