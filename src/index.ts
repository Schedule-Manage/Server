import { runServer } from "./app/application/bin/server";
import Logger from "./app/application/middleware/loggers/logger";
const mongoose = require("mongoose");
require("dotenv").config();

export const main = () => {
  const port = process.env.PORT || 3000;
  const host = process.env.SERVER_URL;

  const { app } = runServer();

  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => Logger.info("DBConnection successfull!"))
    .catch((err: any) => Logger.error(err));

  app.listen(port, () => {
    Logger.debug("Server started");
    Logger.info(`Running on 👉🏼 ${host}:${port} `);
  });
};

main();
