import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.originalUrl}`);

  next();
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      message: "Authentication required",
    });

    return;
  }

  next();
};
