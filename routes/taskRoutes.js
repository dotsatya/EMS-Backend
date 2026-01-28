import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createTask,
  getAllTasks,
  employee,
  updateTaskStatus,
  deleteTask,
  updateTask,
  failedTask,
} from "../controller/taskController.js";

const router = express.Router();

// ADMIN
router.post("/create", authMiddleware, createTask);
router.get("/all", authMiddleware, getAllTasks);
router.put("/update/:id", authMiddleware, updateTask);
router.delete("/delete", authMiddleware, deleteTask);
router.post("/failedTask", authMiddleware, failedTask);

// EMPLOYEE
router.get("/employee", authMiddleware, employee);
router.put("/status", authMiddleware, updateTaskStatus);

export default router;
