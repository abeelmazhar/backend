import bcrypt from "bcrypt";
import { pool } from "../config/database.js";
import { AppError } from "../errors/app.error.js";
import jwt from "jsonwebtoken";
import * as emailService from "./email.service.js";
import * as verificationService from "./verification.service.js";

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
    RETURNING id, name, email, role, is_verified, created_at
    `,
    [name, email, passwordHash],
  );

  const user = result.rows[0];

  const verificationToken = await verificationService.createVerificationToken(
    user.id,
  );

  await emailService.sendVerificationEmail(user.email, verificationToken);

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      password_hash,
      is_verified
    FROM users
    WHERE email = $1
    `,
    [email],
  );

  const user = result.rows[0];

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const passwordMatches = await bcrypt.compare(password, user.password_hash);

  if (!passwordMatches) {
    throw new AppError(401, "Invalid email or password");
  }

  if (!user.is_verified) {
    throw new AppError(403, "Please verify your email before logging in");
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    },
  );

  return { user, token };
};

export const verifyEmail = async (token: string) => {
  return verificationService.verifyEmailToken(token);
};
