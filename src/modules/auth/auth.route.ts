import { Router } from "express";
import { authController } from "./auth.controller";
import { zodValidation } from "../../middlewares/zod";
import { SignupSchema } from "./auth.zod";

const router = Router();

// Public routes
router.post("/register", zodValidation(SignupSchema), authController.register);
// router.post("/login", authController.login);
// router.post("/google", authController.googleAuth);
// router.post("/forgot-password", authController.forgotPassword);
// router.post("/reset-password", authController.resetPassword);
// router.post("/verify-email", authController.verifyEmail);
// router.post("/refresh-token", authController.refreshToken);

export const Authrouter = router;
