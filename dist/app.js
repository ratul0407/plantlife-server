"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
require("./app/config/passport");
const env_1 = require("./app/config/env");
const connect_redis_1 = require("connect-redis");
const redis_config_1 = __importDefault(require("./app/config/redis.config"));
// import { v4 } from "uuid";
const app = (0, express_1.default)();
app.set("trust proxy", 1);
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        env_1.envVars.FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:4173",
    ],
    credentials: true,
}));
app.use((0, express_session_1.default)({
    secret: env_1.envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new connect_redis_1.RedisStore({ client: redis_config_1.default }),
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 10,
    },
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to PlantLife Backend",
    });
});
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
