import { Router } from "express";
import { upload } from "../middleware/upload.middleware.js";
import {
  uploadFile,
  uploadProductImages,
} from "../controllers/upload.controller.js";

const router = Router();

router.post("/upload", upload.single("file"), uploadFile);
router.post("/products/images", upload.array("images", 5), uploadProductImages);

export default router;
