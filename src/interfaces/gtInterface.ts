import { Document } from "mongoose";

export default interface IBook extends Document {
  name: string;
  agentCode: string;
  accountCreated: string;
}
