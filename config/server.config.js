import dotenv from "dotenv";
dotenv.config();

export const serverConfig = {
    port:  process.env.PORT || 3000,
}

export const dbDetails = {
    password: process.env.DB_PASSWORD,
    
}

export const frontendConfig = {
    frontend_url:  process.env.FRONTEND_URL || "http://localhost:5173",
}

export const authConfig = {
    JWT_SECRET: process.env.JWT_SECRET
}