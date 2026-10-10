<div align="center">
  <h1>🏢 Employee Management System - Backend</h1>
  <p><strong>A robust, real-time RESTful API for modern employee and task management.</strong></p>
</div>

<br />

This is the backend service for the Employee Management System, built to securely manage employee records, assign and track tasks, and facilitate real-time updates between administrators and staff.

🔗 **Frontend Repository:** [EMS-Frontend](https://github.com/dotsatya/EMS-Frontend)

---

## 📑 Table of Contents
- [✨ Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🏗️ Project Structure](#️-project-structure)
- [⚙️ Setup and Installation](#️-setup-and-installation)
- [🔐 Environment Variables](#-environment-variables)
- [🚀 API Reference](#-api-reference)
- [⚡ Real-Time Events (Socket.io)](#-real-time-events-socketio)
- [🗄️ Database Schema](#️-database-schema)
- [⏰ Scheduled Tasks](#-scheduled-tasks)

---

## ✨ Features

- **Role-Based Access Control:** Distinct `Admin` and `Employee` authorizations.
- **Task Management Engine:** Admins can create, assign, and manage tasks. Employees can update their task statuses.
- **Real-Time Communication:** Instant socket-based updates (no manual refreshing required) when tasks are assigned, modified, or deleted.
- **Automated Cron Jobs:** Built-in cron jobs automatically update overdue tasks every night at midnight.
- **Secure Authentication:** Passwords hashed via `bcryptjs` and session management handled via JWT.

---

## 🛠️ Technologies Used

| Category | Technology |
|---|---|
| **Runtime / Framework** | Node.js, Express.js |
| **Database / ORM** | MySQL2, Sequelize ORM |
| **Authentication** | JSON Web Token (JWT), bcryptjs |
| **Real-Time** | Socket.io |
| **Utilities** | node-cron, cors, dotenv |

---

## 🏗️ Project Structure

```text
backend/
├── config/                  # Server and Database Configurations
├── controller/              # Business logic (Auth, Tasks, Users, Roles)
├── cronJobs/                # Scheduled automated jobs (node-cron)
├── middleware/              # Custom middlewares (e.g., JWT Auth)
├── model/                   # Sequelize Models and Associations
├── routes/                  # Express route definitions
├── .env                     # Environment variables (Ignored in Git)
├── index.js                 # Main express application entry point
├── package.json             # NPM dependencies and scripts
└── socket.js                # Socket.io event bindings
```

---

## ⚙️ Setup and Installation

### Prerequisites
- **Node.js** (v14+ recommended)
- **MySQL Server** (Running locally or hosted)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root of the backend folder. Refer to the [Environment Variables](#-environment-variables) section below for the required fields.

4. **Initialize the Database:**
   - Create a MySQL database locally matching your `.env` `DB_NAME` (e.g., `EMP_System`).
   - The application automatically synchronizes the tables using Sequelize when starting up.

5. **Run the Server:**
   ```bash
   npm start
   ```
   *The server will typically start on `http://localhost:6969` (or the port specified in `.env`).*

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# Server Configuration
PORT=6969
FRONTEND_URL=http://localhost:5173

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=EMP_System
DB_USER=root
DB_PASSWORD=your_secure_mysql_password

# Authentication
JWT_SECRET=your_super_secret_jwt_key
```

---

## 🚀 API Reference

All requests inside `/api/tasks` and `/api/users` must include a valid JWT token in the `Authorization` header:
`Authorization: Bearer <your_jwt_token>`

### 🔑 Authentication (`/api/auth`)
| Method | Endpoint | Description | Body Params |
|---|---|---|---|
| POST | `/signup` | Register a new user | `{ username, email, password, role }` |
| POST | `/login` | Login user, retrieve JWT | `{ email, password }` |

### 📝 Tasks (`/api/tasks`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/create` | **Admin** | Create a new task |
| GET | `/all` | **Admin** | Get all tasks for all employees |
| GET | `/employee` | **Employee** | Get tasks assigned to current user |
| PUT | `/status` | **Employee** | Update task status (`{ task_id, status_id }`) |

### 👤 Users (`/api/users`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/create` | **Admin** | Create a new user account |

---

## ⚡ Real-Time Events (Socket.io)

Socket.io is configured to facilitate live updates regarding tasks.

### 🌐 Client Events (Admin emitting to Server)
- **`join`**: `(userId)` - Joins a specific user-bound socket room.
- **`assignTask`**: `({ employeeId, taskData })` - Emits when a new task is created.
- **`updateTask`**: `({ employeeId, taskId, taskData })` - Emits when an existing task is updated.
- **`deleteTask`**: `({ employeeId, taskId })` - Emits when a task is removed.

### 📡 Server Events (Server emitting to Employee Client)
- **`newTaskAssigned`**: `(taskData)` - Informs employee of a fresh assignment.
- **`taskUpdated`**: `({ taskId, taskData })` - Informs employee of a modification to their task.
- **`taskDeleted`**: `({ taskId })` - Informs employee that their task was revoked.

---

## 🗄️ Database Schema

| Table Name | Description | Key Relationships |
|---|---|---|
| **Users** | System accounts | Belongs to `Roles` |
| **Roles** | Authorization levels (e.g. Admin, Employee) | Has many `Users` |
| **Tasks** | Assigned work items | Belongs to `Users` (Creator & Assignee) |
| **TaskStatuses**| Possible task states (New, Active, etc.) | Has many `Tasks` |

---

## ⏰ Scheduled Tasks

A built-in node-cron job (`cronJobs/dailyCron.js`) runs daily at **00:01 AM**. 
- **Purpose:** Automatically scans the database for overdue tasks.
- **Action:** If a task's `due_date` is strictly before "today" and the status is still "New" or "Active", it automatically updates the task's status to **Failed**.
