import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";
import { deleteUser } from "../controllers/user.controller.js";
import { validateParams } from "../middleware/validate.js";
import { userIdSchema } from "../schemas/user.schema.js";

const router = Router();

router.get("/users", authenticate, authorize("admin"), async (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

router.delete(
  "/users/:id",
  authenticate,
  authorize("admin"),
  validateParams(userIdSchema),
  deleteUser,
);

export default router;
