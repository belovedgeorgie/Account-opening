import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Record from "../models/gtModel";

const serverHealthCheck = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "pong",
  });
};

const createRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { agentCode, accountCreated } = req.body;

  const detail = new Record({
    _id: new mongoose.Types.ObjectId(),
    agentCode,
    accountCreated,
  });

  return await detail
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
};

const getAllGtAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Record.find()
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
};

export default { getAllGtAccounts, createRecord, serverHealthCheck };
