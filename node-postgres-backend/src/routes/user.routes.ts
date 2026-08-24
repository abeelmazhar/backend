import { Router } from "express";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { validate } from "../middleware/validate.middleware.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js";

const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", validate(createUserSchema), createUser);

router.patch("/:id", validate(updateUserSchema), updateUser);

router.delete("/:id", deleteUser);

export default router;
