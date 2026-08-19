import express from "express";

const app = express();

const PORT = 3000;

app.get("/hello", (req, res) => {
  res.json({
    message: "Hello Backend",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
