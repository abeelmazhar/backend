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

    // We'll attach user information here

    next();
  } catch {
    throw new AppError(401, "Invalid or expired token");
  }
};
