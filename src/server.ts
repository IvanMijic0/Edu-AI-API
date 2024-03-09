import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

import { UserRoutes, TaskRoutes, NoteRoutes, SlideRoutes, PresentationRoutes, AuthRoutes, ImageRoutes, FileRoutes, OpenAIRoutes } from "./routes";

dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT || "3000", 10);

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:300/api-docs",
  "http://192.168.115.130",
  "http://192.168.56.1",
  "http://192.168.115.147",
  "http://192.168.115.107"
];

mongoose.connect(process.env.DB_CONNECTION_STRING || "")
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cors({
    origin: allowedOrigins,
  }))
  .use('/api', UserRoutes)
  .use('/api/auth', AuthRoutes)
  .use('/api', TaskRoutes)
  .use('/api', NoteRoutes)
  .use('/api', PresentationRoutes)
  .use('/api', SlideRoutes)
  .use('/api', FileRoutes)
  .use('/api', OpenAIRoutes)
  .use('/api/image', ImageRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
