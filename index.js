import http from "http";
import express from "express";
import cors from "cors";
import './cronJobs/dailyCron.js'

import { serverConfig, frontendConfig } from "./config/server.config.js";
import {dbConnect} from "./config/dbConnect.config.js";
import { initSocket } from "./socket.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: frontendConfig.frontend_url,
    credentials: true,
  })
);  

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// CREATE HTTP SERVER
const server = http.createServer(app);

// INIT SOCKET.IO
initSocket(server);

// START SERVER
server.listen(serverConfig.port, async () => {
  console.log(`Example app listening on port ${serverConfig.port}! Check it out at http://localhost:${serverConfig.port}`);
  await dbConnect();
});