import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { AppError } from "../errors/app.error.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new AppError(401, "Authentication required");
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError(401, "Invalid authorization header");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    if (
      typeof payload !== "object" ||
      payload === null ||
      !("sub" in payload)
    ) {
      throw new AppError(401, "Invalid token");
    }

    req.userId = Number(payload.sub);

    next();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError(401, "Invalid or expired token");
  }
};
