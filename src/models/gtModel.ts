import mongoose, { Schema } from "mongoose";
import logging from "../config/logging";
import IBook from "../interfaces/gtInterface";

const GtSchema: Schema = new Schema(
  {
    agentCode: { type: String, required: true },
    accountCreated: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

GtSchema.post<IBook>("save", function () {
  logging.info("Mongo", "Checkout the info we just saved: ", this);
});

export default mongoose.model<IBook>("Record", GtSchema);
