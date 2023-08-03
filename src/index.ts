import { runServer } from "./app/application/bin/server";
import Logger from "./app/application/middleware/loggers/logger";
require("dotenv").config();

const main = () => {
  const port = process.env.PORT || 3000;
  const host = process.env.SERVER_URL;

  const { app } = runServer();
  app.listen(port, () => {
    Logger.debug("Server started");
    Logger.info(`Running on 👉🏼 ${host}: ${port} `);
  });
};
