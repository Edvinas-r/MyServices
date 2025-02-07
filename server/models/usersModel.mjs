import { pool } from "../database/postgresConnection.mjs";
import bcrypt from "bcrypt";

const usersModel = {
  createUser: async ({ first_name, last_name, username, email, password }) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const insertUserQuery = `
        INSERT INTO users (first_name, last_name, username, email, role_id)
        VALUES ($1, $2, $3, $4, 1)
        RETURNING id
      `;
      const userResult = await client.query(insertUserQuery, [
        first_name,
        last_name,
        username,
        email,
      ]);
      const newUserId = userResult.rows[0].id;

      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSecretQuery = `
        INSERT INTO users_secrets (userId, password)
        VALUES ($1, $2)
      `;
      await client.query(insertSecretQuery, [newUserId, hashedPassword]);

      await client.query("COMMIT");

      return {
        userId: newUserId,
        role_id: 1,
        message: "User created successfully",
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
  findUserByEmail: async (email) => {
    const client = await pool.connect();
    try {
      const query = `SELECT id FROM users WHERE email = $1`;
      const result = await client.query(query, [email]);
      if (result.rowCount === 0) return null;
      return result.rows[0];
    } finally {
      client.release();
    }
  },

  findUserByUsername: async (username) => {
    const client = await pool.connect();
    try {
      const query = `SELECT id FROM users WHERE username = $1`;
      const result = await client.query(query, [username]);
      if (result.rowCount === 0) return null;
      return result.rows[0];
    } finally {
      client.release();
    }
  },
};

export default usersModel;
