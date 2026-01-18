import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createTask,
  getAllTasks,
  employee,
  updateTaskStatus
} from "../controller/taskController.js";

const router = express.Router();

// ADMIN
router.post("/create",  authMiddleware, createTask);
router.get("/all",  authMiddleware, getAllTasks);

// EMPLOYEE
router.get("/employee",  authMiddleware, employee);
router.put("/status",  authMiddleware, updateTaskStatus);

export default router;
