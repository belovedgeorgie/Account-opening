"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const gtModel_1 = __importDefault(require("../models/gtModel"));
const serverHealthCheck = (req, res, next) => {
    return res.status(200).json({
        message: "pong",
    });
};
const createRecord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { agentCode, accountCreated } = req.body;
    const detail = new gtModel_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        agentCode,
        accountCreated,
    });
    return yield detail
        .save()
        .then((result) => {
        return res.status(201).json({
            detail: result,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error,
        });
    });
});
const getAllGtAccounts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield gtModel_1.default.find()
        .exec()
        .then((details) => {
        return res.status(200).json({
            records: details,
            count: details.length,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error,
        });
    });
});
const getAccountCreated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    console.log(id);
    const filter = { agentCode: "" };
    if (id) {
        filter.agentCode = id.toString();
    }
    yield gtModel_1.default.find(filter)
        .exec()
        .then((details) => {
        return res.status(200).json({
            records: details,
            count: details.length,
        });
    })
        .catch((error) => {
        return res.status(500).json({
            message: error.message,
            error,
        });
    });
});
exports.default = {
    getAllGtAccounts,
    createRecord,
    serverHealthCheck,
    getAccountCreated,
};
