import express, { Application } from "express";
import cors from "cors";
import morganMiddleware from "../middleware/loggers/morgan_middleware";
import AppRouter from "../../presentation/rest/routes";
import { createCorsOptions } from "./../utils/helpers";
const runServer = () => {
  const app: Application = express();

  // Setting up cors
  const corsOptions = createCorsOptions();
  app.use(cors(corsOptions));

  //   Logging
  app.use(morganMiddleware);

  //   express to use json parser
  app.use(express.json());

  // setup routes
  app.post("/register", (req, res) => {
    console.log(req.body)
  });
  app.use("/api/v1/", new AppRouter().router);

  return { app };
};
export { runServer };
