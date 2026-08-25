import { Request, Response, NextFunction } from "express";

import { DatabaseError } from "pg";
import { AppError } from "../errors/app.error.js";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(error);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });

    return;
  }

  if (error instanceof DatabaseError && error.code === "23505") {
    res.status(409).json({
      message: "Email already exists",
    });

    return;
  }

  if (error instanceof DatabaseError && error.code === "22P02") {
    res.status(400).json({
      message: "Invalid ID",
    });

    return;
  }

  res.status(500).json({
    message: "Internal server error",
  });
};
