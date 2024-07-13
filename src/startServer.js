import express, { json } from "express";
import cors from "cors";
import pino from "pino-http";
import { env } from "./utils/env-config.js";
import { productsRouter } from "./routers/productsRouter.js";
import { authRouter } from './routers/authRouter.js';
import { errorHandler } from "./middlewares/errorHandler.js";


export function startServer() {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );

  app.get("/", (req, res) => {
    res.json({
      message: "Hello World!",
    });
  });

  //   app.get(router);

  app.use("/api/products", productsRouter);
  app.use("/api/auth", authRouter);

  app.use((req, res) => {
    res.status(404).json({
      message: "Route not found!",
    });
  });

  app.use(errorHandler);
  const { PORT = 3000 } = env;
  app.listen(PORT, () => {
    console.log(`Server start on port ${PORT} `);
  });
}
