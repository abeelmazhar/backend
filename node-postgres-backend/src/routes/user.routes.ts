import { Router } from "express";
import {
  getUsers,
  createUser,
  getUserById,
} from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUserSchema } from "../schemas/user.schema.js";

const router = Router();

router.get("/", getUsers);

router.post("/", validate(createUserSchema), createUser);

router.get("/:id", getUserById);

export default router;
