import express from "express";
import usersController from "../controllers/usersController.mjs";

const router = express.Router();

router.post("/", usersController.create);

export default router;
