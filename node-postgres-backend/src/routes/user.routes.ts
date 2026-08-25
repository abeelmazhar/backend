import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { validateBody, validateParams } from "../middleware/validate.js";
import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
} from "../schemas/user.schema.js";
const router = Router();

router.get("/", getUsers);

router.get("/:id", validateParams(userIdSchema), getUserById);

router.post("/", validateBody(createUserSchema), createUser);

router.patch("/:id", validateParams(userIdSchema), updateUser);

router.delete("/:id", deleteUser);

export default router;
