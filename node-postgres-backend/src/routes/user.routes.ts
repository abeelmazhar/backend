import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { getUserOrders } from "../controllers/order.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
} from "../schemas/user.schema.js";
const router = Router();

router.get("/", getUsers);

router.get(
  "/:id/orders",
  // authenticate,
  //validateParams(userIdSchema),
  getUserOrders,
);

router.get("/:id", validateParams(userIdSchema), getUserById);

router.post("/", validateBody(createUserSchema), createUser);

router.patch("/:id", validateParams(userIdSchema), updateUser);

router.delete("/:id", deleteUser);

export default router;
