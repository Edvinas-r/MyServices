import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { usersModel } from "../models/index.mjs";
import { authModel } from "../models/index.mjs";

const authController = {
  register: async (req, res, next) => {
    try {
      const { first_name, last_name, username, email, password } = req.body;

      if (!first_name || !last_name || !username || !email || !password) {
        return res.status(400).json({
          status: "error",
          message: "Missing required fields",
        });
      }

      const existingByUsername = await usersModel.findUserByUsername(username);
      if (existingByUsername) {
        return res.status(409).json({
          status: "error",
          message: "Username already in use",
        });
      }

      const existingByEmail = await usersModel.findUserByEmail(email);
      if (existingByEmail) {
        return res.status(409).json({
          status: "error",
          message: "Email already in use",
        });
      }

      const newUser = await usersModel.createUser({
        first_name,
        last_name,
        username,
        email,
        password,
      });

      if (!newUser.role_id) {
        return res.status(500).json({
          status: "error",
          message: "Failed to assign role to user",
        });
      }

      const token = jwt.sign(
        { userId: newUser.id, role_id: newUser.role_id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: {
          userId: newUser.id,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          status: "error",
          message: "Missing username or password",
        });
      }

      const found = await authModel.findUserWithSecretByUsername(username);
      if (!found) {
        return res.status(401).json({
          status: "error",
          message: "Invalid username or password",
        });
      }

      const { user, passwordHash } = found;

      const match = await bcrypt.compare(password, passwordHash);
      if (!match) {
        return res.status(401).json({
          status: "error",
          message: "Invalid username or password",
        });
      }

      const token = jwt.sign(
        { userId: user.id, role_id: user.role_id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: {
          token,
          user: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
            role_id: user.role_id,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
