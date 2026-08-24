import "dotenv/config";
import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
pool
  .query("SELECT NOW()")
  .then((result) => {
    console.log("Database connected!");
    console.log(result.rows);
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
