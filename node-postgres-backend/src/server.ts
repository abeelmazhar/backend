// import "./config/database.js";
// import express from "express";
// import userRoutes from "./routes/user.routes.js";
// import { errorHandler } from "./middleware/error.middleware.js";
// import authRoutes from "./routes/auth.routes.js";
// import { authenticate } from "./middleware/auth.middleware.js";
// import { getCurrentUser } from "./controllers/user.controller.js";
// import { authorize } from "./middleware/authorize.middleware.js";
// import adminRoutes from "./routes/admin.routes.js";
// import uploadRoutes from "./routes/upload.routes.js";
// import emailRoutes from "./routes/email.routes.js";
// import { emailTransporter } from "./config/email.js";
// import helmet from "helmet";
// import cors from "cors";
// import { connectRedis } from "./config/redis.js";
// const app = express();

// async function testEmailConnection() {
//   try {
//     await emailTransporter.verify();

//     console.log("SMTP connection successful");
//   } catch (error) {
//     console.error("SMTP connection failed", error);
//   }
// }

// const PORT = Number(process.env.PORT) || 3000;
// testEmailConnection();
// app.use(helmet());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   }),
// );
// app.use(
//   express.json({
//     limit: "100kb",
//   }),
// );

// app.use("/users", userRoutes);
// app.use("/auth", authRoutes);
// app.use("/admin", adminRoutes);
// app.get("/me", authenticate, getCurrentUser);

// // Upload routes
// app.use("/api", uploadRoutes);

// // Email routes
// app.use("/api/email", emailRoutes);

// app.use(errorHandler);

// await connectRedis();

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// ****************************************************************
// socket.io server

import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();

const PORT = 3000;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.emit("welcome", {
    message: "Welcome to our real-time server!",
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("hello-server", (data) => {
    console.log("Received:", data);
  });
});

// import express from "express";

// const app = express();
// const PORT = 3000;

// app.use(express.json());

// function getCookie(req: express.Request, name: string) {
//   const raw = req.headers.cookie || "";
//   const match = raw
//     .split(";")
//     .map((c) => c.trim())
//     .find((c) => c.startsWith(`${name}=`));
//   return match?.split("=")[1];
// }

// function requireAuth(
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction,
// ) {
//   if (getCookie(req, "auth") === "true") return next();
//   return res.status(401).json({ message: "Unauthorized" });
// }

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   if (email === "hi@gmail.com" && password === "12345") {
//     res.cookie("auth", "true", {
//       httpOnly: true,
//       maxAge: 60 * 1000, // 1 minute
//     });
//     return res.json({ message: "Login successful" });
//   }

//   return res.status(401).json({ message: "Invalid email or password" });
// });

// app.post("/logout", (req, res) => {
//   res.clearCookie("auth");
//   return res.json({ message: "Logged out" });
// });

// app.get("/data", requireAuth, (req, res) => {
//   return res.json({
//     message: "Protected testing data",
//     items: [
//       { id: 1, name: "Item A" },
//       { id: 2, name: "Item B" },
//     ],
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
