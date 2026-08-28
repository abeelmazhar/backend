import { Response, NextFunction } from "express";

import { AuthRequest } from "./auth.middleware.js";
import { UserRole } from "../types/user.js";
import { pool } from "../config/database.js";

export const authorize = (...allowedRoles: UserRole[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({
          message: "User not authenticated",
        });
      }

      const result = await pool.query(
        `
          SELECT id, role
          FROM users
          WHERE id = $1
          `,
        [userId],
      );

      if (result.rows.length === 0) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      const user = result.rows[0];

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          message: "You do not have permission",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
