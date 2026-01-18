import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnect.config.js";

export const Role = sequelize.define("roles", {
  role_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: false,
});
