import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose"; // Import Mongoose

import { UserRoutes } from "./routes";

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT || "3000", 10);

const ipAddresses = ["192.168.115.130"];
const allowedOrigins = [
  ...ipAddresses,
  "http://192.168.115.131",
  "http://192.168.115.132",
];

mongoose.connect(process.env.DB_CONNECTION_STRING || "")
.then(() => {
  console.log('Connected to database');
})
.catch((error) => {
  console.error('Error connecting to database:', error);
});

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors({
    origin: allowedOrigins,
  }))
  .use('/api', UserRoutes);

ipAddresses.forEach(ipAddress => {
  app.get("/", (_req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

  app.listen(port, "0.0.0.0", () => {
    console.log(`[server]: Server is running at http://${ipAddress}:${port}`);
  });
});
