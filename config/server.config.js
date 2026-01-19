import dotenv from "dotenv";
dotenv.config();

export const serverConfig = {
  port: process.env.PORT || 3000,
};

export const dbDetails = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
};

export const frontendConfig = {
  frontend_url: process.env.FRONTEND_URL || "http://localhost:5173",
};

export const authConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
};
