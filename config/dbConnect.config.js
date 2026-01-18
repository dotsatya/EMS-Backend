import { Sequelize } from "sequelize";
import {dbDetails} from "./server.config.js";  

export const sequelize = new Sequelize("EMP_System", "root", dbDetails.password, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // sync models (use alter in dev only)
    await sequelize.sync({ alter: false });
    console.log("✅ Models synced");
  } catch (error) {
    console.error("❌ DB connection failed:", error);
  }
};
