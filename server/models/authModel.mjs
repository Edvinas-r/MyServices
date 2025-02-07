import { pool } from "../database/postgresConnection.mjs";

const authModel = {
  findUserWithSecretByUsername: async (username) => {
    const client = await pool.connect();
    try {
      const userQuery = `
        SELECT 
          u.id, 
          u.first_name, 
          u.last_name, 
          u.email, 
          u.username,
          u.role_id
        FROM users u
        WHERE u.username = $1
      `;
      const userResult = await client.query(userQuery, [username]);
      if (userResult.rowCount === 0) {
        return null;
      }

      const userId = userResult.rows[0].id;
      const secretQuery = `
        SELECT password 
        FROM users_secrets 
        WHERE userId = $1
      `;
      const secretResult = await client.query(secretQuery, [userId]);
      if (secretResult.rowCount === 0) {
        return null;
      }

      return {
        user: userResult.rows[0],
        passwordHash: secretResult.rows[0].password,
      };
    } finally {
      client.release();
    }
  },
};

export default authModel;
