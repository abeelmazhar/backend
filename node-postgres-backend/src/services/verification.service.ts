import crypto from "crypto";

import { pool } from "../config/database.js";
import { AppError } from "../errors/app.error.js";

const TOKEN_EXPIRY_HOURS = 24;

const hashToken = (token: string) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const createVerificationToken = async (userId: number) => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + TOKEN_EXPIRY_HOURS);

  await pool.query(
    `
    DELETE FROM email_verification_tokens
    WHERE user_id = $1
    `,
    [userId],
  );

  await pool.query(
    `
    INSERT INTO email_verification_tokens (user_id, token_hash, expires_at)
    VALUES ($1, $2, $3)
    `,
    [userId, tokenHash, expiresAt],
  );

  return rawToken;
};

export const verifyEmailToken = async (rawToken: string) => {
  const tokenHash = hashToken(rawToken);

  const result = await pool.query(
    `
    SELECT
      t.id,
      t.user_id,
      t.expires_at,
      u.is_verified
    FROM email_verification_tokens t
    INNER JOIN users u ON u.id = t.user_id
    WHERE t.token_hash = $1
    `,
    [tokenHash],
  );

  const record = result.rows[0];

  if (!record) {
    throw new AppError(400, "Invalid or expired verification token");
  }

  if (new Date(record.expires_at) < new Date()) {
    await pool.query(
      `
      DELETE FROM email_verification_tokens
      WHERE id = $1
      `,
      [record.id],
    );

    throw new AppError(400, "Verification token has expired");
  }

  if (record.is_verified) {
    await pool.query(
      `
      DELETE FROM email_verification_tokens
      WHERE user_id = $1
      `,
      [record.user_id],
    );

    throw new AppError(400, "Email is already verified");
  }

  await pool.query(
    `
    UPDATE users
    SET is_verified = TRUE
    WHERE id = $1
    `,
    [record.user_id],
  );

  await pool.query(
    `
    DELETE FROM email_verification_tokens
    WHERE user_id = $1
    `,
    [record.user_id],
  );

  const userResult = await pool.query(
    `
    SELECT id, name, email, role, is_verified, created_at
    FROM users
    WHERE id = $1
    `,
    [record.user_id],
  );

  return userResult.rows[0];
};
