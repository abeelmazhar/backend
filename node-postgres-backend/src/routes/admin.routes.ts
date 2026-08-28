import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const router = Router();

router.get("/users", authenticate, authorize("admin"), async (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

export default router;
