import { pool } from "../database/postgresConnection.mjs";

const categoryModel = {
  getAllCategories: async () => {
    const client = await pool.connect();
    try {
      const query = `SELECT * FROM categories ORDER BY name ASC`;
      const result = await client.query(query);
      return result.rows;
    } finally {
      client.release();
    }
  },

  findCategoryByName: async (category_name) => {
    const client = await pool.connect();
    try {
      const query = `SELECT id FROM categories WHERE name = $1`;
      const result = await client.query(query, [category_name]);
      return result.rowCount > 0 ? result.rows[0].id : null;
    } finally {
      client.release();
    }
  },

  createCategory: async (category_name) => {
    const client = await pool.connect();
    try {
      const query = `INSERT INTO categories (name) VALUES ($1) RETURNING *`;
      const result = await client.query(query, [category_name]);
      return result.rows[0];
    } finally {
      client.release();
    }
  },
};

export default categoryModel;
