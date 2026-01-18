import { User } from "./User.js";
import { Role } from "./Role.js";
import { Task } from "./Task.js";
import { TaskStatus } from "./TaskStatus.js";

// User ↔ Role
User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "Role"
});

// User ↔ Task
User.hasMany(Task, {
  foreignKey: "created_by",
  as: "CreatedTasks"
});

User.hasMany(Task, {
  foreignKey: "assigned_to",
  as: "AssignedTasks"
});

// Task ↔ User
Task.belongsTo(User, {
  foreignKey: "created_by",
  as: "Creator"
});

Task.belongsTo(User, {
  foreignKey: "assigned_to",
  as: "Assignee"
});

// Task ↔ Status
Task.belongsTo(TaskStatus, {
  foreignKey: "status_id",
  as: "Status"
});

TaskStatus.hasMany(Task, {
  foreignKey: "status_id",
  as: "Tasks"
});
