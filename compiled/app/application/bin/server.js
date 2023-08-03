"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_middleware_1 = __importDefault(require("../middleware/loggers/morgan_middleware"));
const runServer = () => {
    const app = (0, express_1.default)();
    // Setting up cors
    app.use((0, cors_1.default)());
    //   Logging
    app.use(morgan_middleware_1.default);
    //   express to use json parser
    app.use(express_1.default.json());
    return { app };
};
exports.runServer = runServer;
