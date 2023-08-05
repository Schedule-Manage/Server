"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_middleware_1 = __importDefault(require("../middleware/loggers/morgan_middleware"));
const routes_1 = __importDefault(require("../../presentation/rest/routes"));
const helpers_1 = require("./../utils/helpers");
const runServer = () => {
    const app = (0, express_1.default)();
    // Setting up cors
    const corsOptions = (0, helpers_1.createCorsOptions)();
    app.use((0, cors_1.default)(corsOptions));
    //   Logging
    app.use(morgan_middleware_1.default);
    //   express to use json parser
    app.use(express_1.default.json());
    // setup routes
    app.use("/api/v1/", new routes_1.default().router);
    return { app };
};
exports.runServer = runServer;
