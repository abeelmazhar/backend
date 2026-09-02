import multer from "multer";
import crypto from "crypto";
import path from "path";

const storage = multer.diskStorage({
  destination: "./uploads",

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const filename = `${crypto.randomUUID()}${extension}`;

    cb(null, filename);
  },
});

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

export const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG and WebP images are allowed"));
    }

    cb(null, true);
  },
});
