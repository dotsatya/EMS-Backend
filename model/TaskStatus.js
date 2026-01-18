import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnect.config.js";

export const TaskStatus = sequelize.define("task_status", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  status_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    defaultValue: "New",
  },
}, {
  tableName: "task_status",
  timestamps: false,
});

