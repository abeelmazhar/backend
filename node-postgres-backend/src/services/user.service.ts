import { pool } from "../config/database.js";

// Get all users
export const getUsers = async () => {
  const result = await pool.query(
    `
    SELECT id, name, email,role, created_at
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

// Update a user
export const updateUser = async (id: number, name?: string, email?: string) => {
  const result = await pool.query(
    `
    UPDATE users
    SET
      name = COALESCE($1, name),
      email = COALESCE($2, email)
    WHERE id = $3
    RETURNING id, name, email, created_at
    `,
    [name, email, id],
  );

  return result.rows[0];
};

// Delete a user

export const deleteUser = async (id: number) => {
  const result = await pool.query(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING id
    `,
    [id],
  );

  return result.rows[0];
};
