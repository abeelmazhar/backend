import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Validation failed",
        errors: result.error.issues,
      });

      return;
    }

    req.body = result.data;

    next();
  };
};

export const validateParams = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      res.status(400).json({
        message: "Invalid parameters",
        errors: result.error.issues,
      });

      return;
    }

    req.params = result.data as Request["params"];

    next();
  };
};
