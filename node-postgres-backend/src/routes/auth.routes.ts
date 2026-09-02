import { Router } from "express";

import { register, login } from "../controllers/auth.controller.js";

import { validateBody } from "../middleware/validate.js";

import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

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

router.post("/login", validateBody(loginSchema), login, loginLimiter);

export default router;
