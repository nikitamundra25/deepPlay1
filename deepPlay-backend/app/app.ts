import { DBHost, DBName, DBProtocol } from "./config";
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
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "build")));

const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token", "authorization"]
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
  console.log("req", req.query);
  return res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});
// app.get("/*", (req: express.Request, res: express.Response) => {
//   console.log("req", req.query);
//   return res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });
/**
 *
 */
const port: number = Number(process.env.PORT) || 8000;
/**
 *
 */
app.listen(port, (): void => {
  console.log(`App running on port ${port}!`);
});
