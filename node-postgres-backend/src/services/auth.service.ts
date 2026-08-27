import bcrypt from "bcrypt";
import { pool } from "../config/database.js";
import { AppError } from "../utils/app-error.js";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await pool.query(
    `
    SELECT id
    FROM users
    WHERE email = $1
    `,
    [email],
  );

  if (existingUser.rows[0]) {
    throw new Error("Email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const result = await pool.query(
    `
    INSERT INTO users (
      name,
      email,
      password_hash
    )
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at
    `,
    [name, email, passwordHash],
  );

  return result.rows[0];
};

// login user

export const loginUser = async (email: string, password: string) => {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      password_hash
    FROM users
    WHERE email = $1
    `,
    [email],
  );

  const user = result.rows[0];

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401);
  }

  // JWT will be created here

  return user;
};
