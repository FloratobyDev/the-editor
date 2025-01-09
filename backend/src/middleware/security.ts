import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import { Express } from "express";

export const configureSecurityMiddleware = (app: Express) => {
  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });

  app.use(limiter);

  // Security headers
  app.use(helmet());

  // CORS configuration
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
    })
  );
};
