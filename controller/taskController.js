import { Task } from "../model/Task.js";
import { User } from "../model/User.js";
import { TaskStatus } from "../model/TaskStatus.js";
import { authorizationUtil } from "./util.js";
import { sequelize } from "../config/dbConnect.config.js";
import { getIO } from "../socket.js";

/**
 * ADMIN → Create Task
 */
export const createTask = async (req, res) => {
  try {
    const { title, description, due_date, assigned_to, category } = req.body;
    const { id, role } = req.user; // from JWT

    authorizationUtil(["admin"], role);


    const task = await Task.create({
      title,
      description,
      created_by: id,
      assigned_to,
      status_id: 1, // 1 = new
      due_date,
      category,
    });

    const taskWithStatus = await Task.findByPk(task.id, {
      include: [
        {
          model: TaskStatus,
          as: "Status",
          attributes: ["status_name"],
        },
        {
          model: User,
          as: "Creator",
          attributes: ["username"],
        },
      ],
    });

    const io = getIO();
    io.to(`user_${assigned_to}`).emit("newTaskAssigned", taskWithStatus.toJSON());
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * ADMIN → View all tasks
 */
export const getAllTasks = async (req, res) => {
  try {
    const { role } = req.user;


    authorizationUtil(["admin"], role);

    const employeesData = await User.findAll({
      where: { role_id: 2 }, // 2 = employee
      attributes: ["id", "username", "email"],
      include: [
        {
          model: Task,
          as: "AssignedTasks",
          attributes: ["id", "title", "description", "status_id", "due_date"],
          include: [
            {
              model: TaskStatus,
              as: "Status",
              attributes: ["status_name"],
            },
            {
              model: User,
              as: "Creator",
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    /* all task*/

    const formattedResponse = employeesData.map((empInstance) => {
      const emp = empInstance.get({ plain: true });
      // --- DEBUG LOG START ---
      // This will show you exactly what 'Status' looks like in your terminal
      // if (emp.AssignedTasks.length > 0) {
      //   console.log("Full Task Object:", JSON.stringify(emp.AssignedTasks[0], null, 2));
      // }
      // --- DEBUG LOG END ---

      return {
        employee: {
          id: emp.id,
          username: emp.username,
          email: emp.email,
        },
        tasks: emp.AssignedTasks.map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          due_date: task.due_date,
          status: task.Status ? task.Status.status_name : "N/A",
          created_by: task.Creator ? task.Creator.username : "Unknown",
        })),
      };
    });

    res.json(formattedResponse);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
};

/**
 * EMPLOYEE → View my tasks
 */
export const employee = async (req, res) => {
  try {
    const { id, role } = req.user;

    authorizationUtil(["employee"], role);

    const employee = await User.findOne({
      where: { id },
      attributes: ["id", "username", "email"],
      include: [
        {
          model: Task,
          as: "AssignedTasks",
          attributes: ["id", "category", "title", "description", "due_date"],
          include: [
            {
              model: TaskStatus,
              as: "Status",
              attributes: ["status_name"],
            },
            {
              model: User,
              as: "Creator",
              attributes: ["username"],
            },
          ],
        },
      ],
      order: [[{ model: Task, as: "AssignedTasks" }, "due_date", "ASC"]],
    });

    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * EMPLOYEE → Update task status
 */
export const updateTaskStatus = async (req, res) => {
  try {
    const { task_id, status_id } = req.body;
    const { id, role } = req.user;

    authorizationUtil(["employee"], role);

    const updated = await Task.update(
      { status_id },
      { where: { id: task_id, assigned_to: id } },
    );

    if (updated[0] === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task status updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
