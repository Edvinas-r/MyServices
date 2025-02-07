import express from "express";
import usersRoutes from "./usersRoutes.mjs";
import servicesRoutes from "./servicesRoutes.mjs";
import authRoutes from "./authRoutes.mjs";
import categoryRoutes from "./categoryRoutes.mjs";

const router = express.Router();

router.use("/users", usersRoutes);
router.use("/services", servicesRoutes);
router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);

export default router;
