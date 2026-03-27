import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || "5000",
  node_env: process.env.NODE_ENV || "development",
  database_url: process.env.DATABASE_URL as string,

  // JWT
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET as string,
    refreshSecret: process.env.JWT_REFRESH_SECRET as string,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    emailSecret: process.env.JWT_EMAIL_SECRET as string,
    resetSecret: process.env.JWT_RESET_SECRET as string,
  },

  // Google OAuth
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL as string,
  },

  // Email (SMTP)
  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
  },

  // URLs
  appBaseUrl: process.env.APP_BASE_URL || "http://localhost:5000",
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  betterAuthSecret: process.env.BETTER_AUTH_SECRET,
};
