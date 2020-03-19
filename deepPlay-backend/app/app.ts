import { DBHost, DBName, DBProtocol, Port } from "./config";
import Mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import path from "path";
import cors from "cors";
import http from "http";
// Create a new express application instance
const app: express.Application = express();
const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token", "authorization", "Content-Type"]
};
const url: string = `${DBProtocol}://${DBHost}/${DBName}`;

Mongoose.connect(
  url,
  { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true },
  (err: any) => {
    if (err) throw err;
  }
);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors(corsOption));
app.use("/api/v1", router);
/**
 *
 */
app.get("/", (req: express.Request, res: express.Response) => {
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/*", (req: express.Request, res: express.Response) => {
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});

/**
 *
 */
const port: number = Number(process.env.PORT) || Port;
/**
 *
 */
const server = http.createServer(app);
server.listen(port, (): void => {
  console.log(`App running on port ${port}!`);
});

server.on("connection", serverApp => {
  serverApp.setTimeout(600 * 60 * 1000);
});
