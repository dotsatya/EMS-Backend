import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnect.config.js";
import { Role } from "./Role.js";

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  timestamps: false,
});

// relations
User.belongsTo(Role, { foreignKey: "role_id" });
