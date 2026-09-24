import express from "express";
import { httpLogger } from "./config/httpLogger.js";

const app = express();

app.use(httpLogger);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

export default app;
