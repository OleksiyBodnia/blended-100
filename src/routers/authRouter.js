import { Router } from "express";
import {
  loginUser,
  registerUser,
  sendEmailController,
} from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/send/email", sendEmailController);

export { authRouter };
