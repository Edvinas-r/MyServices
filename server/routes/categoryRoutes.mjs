import express from "express";
import categoryController from "../controllers/categoryController.mjs";
import authMiddleware from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/", categoryController.getAll);

router.get("/find/:name", categoryController.findByName);

router.post("/", authMiddleware, categoryController.create);

export default router;
