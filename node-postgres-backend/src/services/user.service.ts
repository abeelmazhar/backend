import { pool } from "../config/database.js";

// Get all users
export const getUsers = async () => {
  const result = await pool.query(
    `
    SELECT id, name, email, created_at
    FROM users
    ORDER BY id
    `,
  );

  return result.rows;
};

// Get a user by id
export const getUserById = async (id: number) => {
  const result = await pool.query(
    `
    SELECT id, name, email, created_at
    FROM users
    WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
};

// Create a user
export const createUser = async (name: string, email: string) => {
  const result = await pool.query(
    `
    INSERT INTO users (name, email)
    VALUES ($1, $2)
    RETURNING id, name, email, created_at
    `,
    [name, email],
  );

  return result.rows[0];
};
