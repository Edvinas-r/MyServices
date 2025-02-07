import { usersModel } from "../models/index.mjs";

const usersController = {
  create: async (req, res, next) => {
    try {
      const { first_name, last_name, username, email, password } = req.body;

      if (!first_name || !last_name || !username || !email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Missing required fields",
        });
      }

      const result = await usersModel.createUser({
        first_name,
        last_name,
        username,
        email,
        password,
      });

      if (!result.role_id) {
        return res.status(500).json({
          status: "error",
          message: "Failed to assign role to user",
        });
      }

      return res.status(201).json({
        status: "success",
        data: {
          userId: result.userId,
          role_id: result.role_id,
        },
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default usersController;
