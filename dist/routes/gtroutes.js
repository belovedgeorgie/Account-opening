"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const gtcontroller_1 = __importDefault(require("../controllers/gtcontroller"));
const router = express_1.default.Router();
router.get("/", gtcontroller_1.default.serverHealthCheck);
router.post("/create-record", gtcontroller_1.default.createRecord);
router.get("/get-records", gtcontroller_1.default.getAllGtAccounts);
module.exports = router;
