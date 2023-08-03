import express, { Application } from "express";
import cors from "cors";
import morganMiddleware from "../middleware/loggers/morgan_middleware";
const runServer = () => {
  const app: Application = express();

  // Setting up cors
  app.use(cors());

  //   Logging
  app.use(morganMiddleware);

  //   express to use json parser
  app.use(express.json());

  return { app };
};
export { runServer };