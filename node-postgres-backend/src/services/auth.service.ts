import bcrypt from "bcrypt";
import { pool } from "../config/database.js";
import { AppError } from "../errors/app.error.js";
import jwt from "jsonwebtoken";
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
    throw new AppError(409, "Email already exists");
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
    RETURNING id, name, email, role, created_at
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
  const token = jwt.sign(
    {
      sub: user.id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    },
  );
  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatches) {
    throw new AppError(401, "Invalid email or password");
  }

  // JWT will be created here

  return { user, token };
};
