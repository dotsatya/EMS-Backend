import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnect.config.js";
import { User } from "./User.js";
import { TaskStatus } from "./TaskStatus.js";

export const Task = sequelize.define("tasks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: "General",
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  due_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'task_status',
      key: 'id'
    }
  }
}, {
  createdAt: "created_at",
  updatedAt: false,
});

// relations
User.hasMany(Task, { foreignKey: "created_by", as: "CreatedTasks" });
User.hasMany(Task, { foreignKey: "assigned_to", as: "AssignedTasks" });

Task.belongsTo(User, { foreignKey: "created_by", as: "Creator" });
Task.belongsTo(User, { foreignKey: "assigned_to", as: "Assignee" });

TaskStatus.hasMany(Task, { foreignKey: "status_id" , as: "Tasks"});
Task.belongsTo(TaskStatus, { foreignKey: "status_id", targetKey: "id", as: "Status" });
