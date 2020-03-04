import { DBHost, DBName, DBProtocol, Port } from "./config";
import Mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import path from "path";
import cors from "cors";
// Create a new express application instance
const app: express.Application = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));
console.log(`Directory name ${__dirname}`);

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token", "authorization", "Content-Type"]
};
app.use(cors(corsOption));

const url: string = `${DBProtocol}://${DBHost}/${DBName}`;

Mongoose.connect(
  url,
  { useNewUrlParser: true, useFindAndModify: false },
  (err: any) => {
    if (err) throw err;
  }
);

app.use("/api/v1", router);
/**
 *
 */
app.get("/", (req: express.Request, res: express.Response) => {
  req.connection.setTimeout(0)
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/*", (req: express.Request, res: express.Response) => {
  req.connection.setTimeout(0)  
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});

/**
 *
 */
const port: number = Number(process.env.PORT) || Port;
/**
 *
 */
app.listen(port, (): void => {
  console.log(`App running on port ${port}!`);
});
