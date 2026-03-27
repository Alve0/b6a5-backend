import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes";
import globalErrorHandler from "./errors/globalErrorHandler";
import notFound from "./middlewares/notfound";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Apollo Gears World!");
});

// 404 handler
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
