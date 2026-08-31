import { pool } from "../config/database.js";

export const getOrdersByUserId = async (userId: number) => {
  const result = await pool.query(
    `
    SELECT id, user_id, total, status, created_at
    FROM orders
    WHERE user_id = $1
    ORDER BY id
    `,
    [userId],
  );

  return result.rows;
};
