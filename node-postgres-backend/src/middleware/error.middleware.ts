import { Request, Response, NextFunction } from "express";

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

  res.status(500).json({
    message: "Internal server error",
  });
};
