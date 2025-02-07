import express from "express";
import servicesController from "../controllers/servicesController.mjs";
import authMiddleware from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/", servicesController.getAll);
router.get("/:id", servicesController.getOne);

router.post("/", authMiddleware, servicesController.create);
router.put("/:id", authMiddleware, servicesController.update);
router.delete("/:id", authMiddleware, servicesController.delete);

export default router;
