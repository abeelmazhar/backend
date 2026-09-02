import { Router } from "express";

import { sendEmail } from "../controllers/email.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.js";
import { sendEmailSchema } from "../schemas/email.schema.js";

const router = Router();

router.post(
  "/send",
  // authenticate,
  // validateBody(sendEmailSchema),
  sendEmail,
);

export default router;
