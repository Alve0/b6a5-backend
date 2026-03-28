import { NextFunction, Request, Response } from "express";
import z, { ZodObject, ZodError } from "zod";
import AppError from "../errors/AppError";

export const zodValidation = (zodSchema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedResult = zodSchema.parse(req.body);
      req.body = parsedResult;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        const zodError = new AppError("Zod Validation Error", 400);
        (zodError as any).errors = formattedErrors;
        next(zodError);
      } else {
        next(error);
      }
    }
  };
};
