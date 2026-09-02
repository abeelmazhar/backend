import "./config/database.js";
import express from "express";
import userRoutes from "./routes/user.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import { authenticate } from "./middleware/auth.middleware.js";
import { getCurrentUser } from "./controllers/user.controller.js";
import { authorize } from "./middleware/authorize.middleware.js";
import adminRoutes from "./routes/admin.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import { emailTransporter } from "./config/email.js";
import helmet from "helmet";
import cors from "cors";
const app = express();

async function testEmailConnection() {
  try {
    await emailTransporter.verify();

    console.log("SMTP connection successful");
  } catch (error) {
    console.error("SMTP connection failed", error);
  }
}

const PORT = Number(process.env.PORT) || 3000;
testEmailConnection();
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(
  express.json({
    limit: "100kb",
  }),
);

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.get("/me", authenticate, getCurrentUser);

// Upload routes
app.use("/api", uploadRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
