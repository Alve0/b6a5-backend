import { Router } from "express";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API router is working" });
});

router.get(
  "/health",
  catchAsync(async (_req, res) => {
    sendResponse(res, {
      statusCode: 200,
      status: "success",
      data: { status: "ok", uptime: process.uptime() },
    });
  }),
);

// Example user route using global prisma access
router.get(
  "/users",
  catchAsync(async (_req, res) => {
    const users = await prisma.user.findMany();
    sendResponse(res, { statusCode: 200, status: "success", data: users });
  }),
);

export default router; 
