import express from "express";

const app = express();

const PORT: number = 3000;

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

app.get("/users", (req, res) => {
  res.json({
    users: [],
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
