import express from "express";
import userRoutes from "./routes/user.routes.js";

const app = express();

const PORT: number = 3000;

app.use(express.json());

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
