import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes";
import globalErrorHandler from "./errors/globalErrorHandler";
import AppError from "./errors/AppError";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Apollo Gears World!");
});

app.use(globalErrorHandler);

export default app;
