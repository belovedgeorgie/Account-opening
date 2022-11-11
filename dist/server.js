"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const gtroutes_1 = __importDefault(require("./routes/gtroutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const fs = require("fs");
const NAMESPACE = "Server";
const router = (0, express_1.default)();
/* router.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
); */
/** Connect to Mongo */
mongoose_1.default
    .connect(config_1.default.mongo.url, config_1.default.mongo.options)
    .then((result) => {
    logging_1.default.info(NAMESPACE, "Mongo Connected");
})
    .catch((error) => {
    logging_1.default.error(NAMESPACE, error.message, error);
});
/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on("finish", () => {
        /** Log the res */
        logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});
/** Parse the body of the request */
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
/** Rules of our API */
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
/** Routes go here */
router.use("/api/gtaccounts", gtroutes_1.default);
/** Error handling */
router.use((req, res, next) => {
    const error = new Error("Not found");
    res.status(404).json({
        message: error.message,
    });
});
const httpServer = https_1.default.createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
}, router);
httpServer.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server is running ${config_1.default.server.hostname}:${config_1.default.server.port}`));