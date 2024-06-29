import express, { json } from 'express';
import cors from "cors";
import pino from "pino-http"
import { env } from './utils/env-config.js';


export function startServer() {
  const app = express();

  app.use(json());

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

//   app.get(router);

  app.use("/api/products", (req, res) => {
    res.json("API PRODUCTS!");
  })

  app.use((req, res) => {
    res.status(404).json({
        message: "Route not found!"
    })
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
        message: "Something went wrong."
    })
  })
  const {PORT = 3000} = env;
  app.listen(PORT, ()=> {
    console.log(`Server start on port ${PORT} `)
  });
};
