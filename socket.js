import { Server } from "socket.io";
import { frontendConfig } from "./config/server.config.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: frontendConfig.frontend_url,
      methods: ["GET", "POST", "PUT"],
      credentials: true,
    },
    transports: ["polling", "websocket"],
  });

  io.on("connection", (socket) => {
    // console.log("Socket connected:", socket.id);

    // Join user's room
    socket.on("join", (userId) => {
      socket.join(`user_${userId}`);
      // console.log(`User ${userId} joined room`);
      // console.log(io.sockets.adapter.rooms);
    });

    socket.on("hello", (data) => {
      // console.log(data);
    });

    // Listen for task from admin
    socket.on("assignTask", (data) => {
      const { employeeId, taskData } = data;
      io.to(`user_${employeeId}`).emit("newTaskAssigned", taskData);
      // console.log(`Task assigned to employee ${employeeId} with ${taskData.id}`);
    });

    // task updates
    socket.on("updateTask", (data) => {
      const { employeeId, taskId, taskData } = data;
      io.to(`user_${employeeId}`).emit("taskUpdated", { taskId, taskData });
      // console.log(`Task ${taskId} updated for employee ${employeeId}`);
    });

    // task delete
    socket.on("deleteTask", (data) => {
      const { employeeId, taskId } = data;
      io.to(`user_${employeeId}`).emit("taskDeleted", { taskId });
      // console.log(`Task ${taskId} deleted for employee ${employeeId}`);
    });

    socket.on("disconnect", () => {
      // console.log("Socket disconnected:", socket.id);
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
