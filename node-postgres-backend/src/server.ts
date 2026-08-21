import express from "express";
import userRoutes from "./routes/user.routes.js";
import { logger, authMiddleware } from "./middleware/logger.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { AppError } from "./utils/app-error.js";
const app = express();

const PORT: number = 3000;

app.use(express.json());

// app.use(logger);

app.use("/users", userRoutes);

app.get("/hello", (req, res) => {
  res.json({
    message: "Hello Backend",
  });
});

app.get("/test-error", (req, res, next) => {
  next(new AppError("Something went wrong", 400));
});

app.get("/about", (req, res) => {
  res.json({
    message: "This is my TypeScript backend",
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
