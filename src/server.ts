import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT || "3000", 10);

const ipAddresses = ["192.168.115.130"];
const allowedOrigins = [
  ...ipAddresses,
  "http://192.168.115.131",
  "http://192.168.115.132",
];

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors({
    origin: allowedOrigins,
  }));

ipAddresses.forEach(ipAddress => {
  app.get("/", (_req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

  app.listen(port, "0.0.0.0", () => {
    console.log(`[server]: Server is running at http://${ipAddress}:${port}`);
  });
});
