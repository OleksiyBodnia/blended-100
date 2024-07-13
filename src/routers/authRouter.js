import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post('/register', registerUser);
authRouter.post("/login", loginUser);

export { authRouter };