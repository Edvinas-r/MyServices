import pg from "pg";

import dotenv from "dotenv";

if (process.env.NODE === "prod") {
  dotenv.config({ path: ".env.prod" });
} else {
  dotenv.config({ path: ".env.dev" });
}

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

export const connectDB = async () => {
  try {
    console.log("Database initialized");
    await pool.connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error(error.stack);
    throw error;
  }
};
