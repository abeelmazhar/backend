import express from "express";
import userRoutes from "./routes/user.routes.js";
import { logger, authMiddleware } from "./middleware/logger.middleware.js";

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

app.get("/about", (req, res) => {
  res.json({
    message: "This is my TypeScript backend",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
