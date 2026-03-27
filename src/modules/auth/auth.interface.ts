import { Request } from "express";
import { ROLE } from "../../generated/prisma/client";

export interface JWTPayload {
  id: string;
  email: string;
  role: ROLE;
}

export interface AuthRequest extends Request {
  user?: JWTPayload;
}
