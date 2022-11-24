import dotenv from "dotenv";

dotenv.config();

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  maxPoolSize: 50,
  autoIndex: false,
  retryWrites: false,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || "root";
const MONGO_PASSWORD = process.env.MONGO_USERNAME || "root";
const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb+srv://root:root@microsystemscluster.99hdzum.mongodb.net/?retryWrites=true&w=majority";
const MONGO_CLUSTER = process.env.MONGO_CLUSTER || "microsystemscluster";

const MONGO = {
  cluster: MONGO_CLUSTER,
  password: MONGO_PASSWORD,
  username: MONGO_USERNAME,
  options: MONGO_OPTIONS,
  url: MONGO_URL,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const PORT = process.env.PORT || 8000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: PORT,
};

const config = {
  server: SERVER,
  mongo: MONGO,
};

export default config;
