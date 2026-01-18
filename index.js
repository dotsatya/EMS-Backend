// const express = require("express");
import express from "express";
import cors from "cors";
import './cronJobs/dailyCron.js'

import { serverConfig, frontendConfig } from "./config/server.config.js";
// import router from "./routes/router.js";
import {dbConnect} from "./config/dbConnect.config.js";


import authRoutes from "./routes/authRoutes.js";

import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: frontendConfig.frontend_url,
    credentials: true,
  })
);  

// app.use("/", router)
app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(serverConfig.port, () => {
    console.log(`Example app listening on port ${serverConfig.port}! Check it out at http://localhost:${serverConfig.port}`);
    dbConnect();
});
