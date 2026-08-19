import express from "express";

const app = express();

app.use(express.json());

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

app.post("/users", (req, res) => {
  console.log(req.body);

  res.status(201).json({
    message: "User created",
    user: req.body,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
