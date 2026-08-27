import "./config/database.js";
import express from "express";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
