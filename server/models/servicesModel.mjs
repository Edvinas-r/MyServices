import { pool } from "../database/postgresConnection.mjs";
import categoryModel from "./categoryModel.mjs";

const servicesModel = {
  getAllServices: async () => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT 
          s.id, 
          s.name, 
          s.description, 
          s.image_url,
          s.price, 
          s.created_at,
          
          c.id AS category_id, 
          c.name AS category_name
        FROM services s
        JOIN categories c ON s.category_id = c.id
        ORDER BY s.created_at DESC
      `;
      const result = await client.query(query);
      return result.rows;
    } finally {
      client.release();
    }
  },

  getServiceById: async (serviceId) => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT 
          s.id, 
          s.name, 
          s.description, 
          s.image_url,
          s.price, 
          s.created_at, 
          
          c.id AS category_id, 
          c.name AS category_name
        FROM services s
        JOIN categories c ON s.category_id = c.id
        WHERE s.id = $1
      `;
      const result = await client.query(query, [serviceId]);
      return result.rows[0] || null;
    } finally {
      client.release();
    }
  },

  createService: async ({
    name,
    description,
    image_url,
    price,
    category_name,
  }) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      let categoryId = await categoryModel.findCategoryByName(category_name);
      if (!categoryId) {
        const newCategory = await categoryModel.createCategory(category_name);
        categoryId = newCategory.id;
      }

      const query = `
        INSERT INTO services 
          (name, description, image_url, price, category_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const values = [name, description, image_url, price, categoryId];
      const result = await client.query(query, values);

      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  updateService: async (
    serviceId,
    { name, description, image_url, price, category_name }
  ) => {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      let categoryId = await categoryModel.findCategoryByName(category_name);
      if (!categoryId) {
        const newCategory = await categoryModel.createCategory(category_name);
        categoryId = newCategory.id;
      }

      const query = `
        UPDATE services
        SET 
          name = $1, 
          description = $2, 
          image_url = $3,
          price = $4, 
          category_id = $5, 
          updated_at = NOW()
        WHERE id = $6
        RETURNING *;
      `;
      const values = [
        name,
        description,
        image_url,
        price,
        categoryId,
        serviceId,
      ];
      const result = await client.query(query, values);

      await client.query("COMMIT");
      return result.rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  deleteService: async (serviceId) => {
    const client = await pool.connect();
    try {
      const query = `
        DELETE FROM services
        WHERE id = $1
        RETURNING id;
      `;
      const result = await client.query(query, [serviceId]);
      return result.rowCount > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  },
};

export default servicesModel;
