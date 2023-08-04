"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./app/application/bin/server");
const logger_1 = __importDefault(require("./app/application/middleware/loggers/logger"));
const mongoose = require("mongoose");
require("dotenv").config();
const main = () => {
    const port = process.env.PORT || 3000;
    const host = process.env.SERVER_URL;
    const { app } = (0, server_1.runServer)();
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => logger_1.default.info("DBConnection successfull!"))
        .catch((err) => logger_1.default.error(err));
    app.listen(port, () => {
        logger_1.default.debug("Server started");
        logger_1.default.info(`Running on 👉🏼 ${host}: ${port} `);
    });
};
