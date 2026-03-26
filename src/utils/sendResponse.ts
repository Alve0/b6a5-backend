import { Response } from "express";

interface SendResponseOptions<T> {
  statusCode?: number;
  status?: "success" | "fail" | "error";
  message?: string;
  data?: T;
}

const sendResponse = <T>(res: Response, options: SendResponseOptions<T>) => {
  const {
    statusCode = 200,
    status = "success",
    message = "",
    data = null,
  } = options;

  return res.status(statusCode).json({
    status,
    message,
    data,
  });
};

export default sendResponse;
