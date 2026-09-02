import { Router } from "express";

import { register, login, verifyEmail } from "../controllers/auth.controller.js";

import { validateBody, validateQuery } from "../middleware/validate.js";

import {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
} from "../schemas/auth.schema.js";

import rateLimit from "express-rate-limit";

const router = Router();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    message: "Too many login attempts. Try again later.",
  },
});

router.post("/register", validateBody(registerSchema), register);

router.post("/login", loginLimiter, validateBody(loginSchema), login);

router.get(
  "/verify-email",
  validateQuery(verifyEmailSchema),
  verifyEmail,
);

router.post(
  "/verify-email",
  validateBody(verifyEmailSchema),
  verifyEmail,
);

export default router;
