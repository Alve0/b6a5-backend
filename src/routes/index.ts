import { Router } from "express";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { Authrouter } from "../modules/auth/auth.route";

const router = Router();

// Auth routes
router.use("/auth", Authrouter);

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

export default router;
