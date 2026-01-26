# Employee Management System - Backend

This backend provides a RESTful API for managing employees, tasks, and roles in an employee management system. It uses Node.js, Express, Sequelize ORM, and MySQL database.

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **Sequelize**: ORM for MySQL
- **MySQL2**: MySQL client
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **node-cron**: Scheduled tasks
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **Socket.IO**: Real-time communication

## Project Structure

```
backend/
├── config/
│   ├── dbConnect.config.js    # Database connection setup
│   └── server.config.js       # Server configuration
├── controller/
│   ├── authController.js      # Authentication (signup, login)
│   ├── roleController.js      # Role management
│   ├── taskController.js      # Task CRUD operations
│   ├── userController.js      # User management
│   └── util.js                # Utility functions
├── cronJobs/
│   └── dailyCron.js           # Daily scheduled tasks
├── middleware/
│   └── authMiddleware.js      # JWT authentication middleware
├── model/
│   ├── index.js               # Model associations
│   ├── Role.js                # Role model
│   ├── Task.js                # Task model
│   ├── TaskStatus.js          # Task status model
│   └── User.js                # User model
├── routes/
│   ├── authRoutes.js          # Authentication routes
│   ├── taskRoutes.js          # Task management routes
│   └── userRoutes.js          # User management routes
├── .env                       # Environment variables
├── index.js                   # Main application entry point
├── socket.js                  # Socket.IO configuration for real-time features
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Database Models

### User
- **id**: Primary key (auto-increment)
- **username**: String, not null
- **email**: String, not null, unique
- **password**: String, not null (hashed)
- **role_id**: Integer, references roles table

### Role
- **role_id**: Primary key (auto-increment)
- **role_name**: String, not null, unique (e.g., "admin", "employee")

### Task
- **id**: Primary key (auto-increment)
- **category**: String, default "General"
- **title**: String, not null
- **description**: Text
- **due_date**: Date (DATEONLY), not null
- **status_id**: Integer, references task_status table
- **created_by**: Foreign key to users.id
- **assigned_to**: Foreign key to users.id
- **created_at**: Timestamp

### TaskStatus
- **id**: Primary key (auto-increment)
- **status_name**: String, not null, unique (e.g., "New", "Active", "Complete", "Failed")

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /signup`: User registration
  - Body: `{ username, email, password, role }`
- `POST /login`: User login
  - Body: `{ email, password }`
  - Returns: JWT token and user info

### Task Routes (`/api/tasks`)
All task routes require JWT authentication.

**Admin Only:**
- `POST /create`: Create a new task
  - Body: `{ title, description, due_date, assigned_to, category }`
- `GET /all`: Get all tasks for all employees
  - Returns: Formatted data grouped by employee

**Employee Only:**
- `GET /employee`: Get tasks assigned to current user
- `PUT /status`: Update task status
  - Body: `{ task_id, status_id }`

### User Routes (`/api/users`)
- `POST /create`: Create a new user (for testing)
  - Body: `{ username, email, password, role_id }`

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <token>
```

## Real-Time Features

The application uses Socket.IO for real-time communication between admin and employees for task management.

### Socket Events

**Client Events (Admin):**
- `join`: Join a user's room (emitted on connection)
  - Data: `{ userId }`
- `assignTask`: Assign a new task to an employee
  - Data: `{ employeeId, taskData }`
- `updateTask`: Update an existing task
  - Data: `{ employeeId, taskId, taskData }`
- `deleteTask`: Delete a task
  - Data: `{ employeeId, taskId }`

**Server Events (Employee):**
- `newTaskAssigned`: Notifies employee of a newly assigned task
  - Data: `{ taskData }`
- `taskUpdated`: Notifies employee of task updates
  - Data: `{ taskId, taskData }`
- `taskDeleted`: Notifies employee of task deletion
  - Data: `{ taskId }`

Employees join their personal room on connection using `join` event with their user ID.

## Scheduled Tasks

A daily cron job runs at 00:01 AM to automatically update overdue tasks:
- Tasks with status "New" or "Active" and due_date <= today are marked as "Failed" (status_id: 4)

## Setup and Installation

1. **Clone the repository** and navigate to the backend folder

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the backend root with:
   ```
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   DB_PASSWORD=your_mysql_password
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Set up MySQL database**:
   - Create a database named `EMP_System`
   - Ensure MySQL is running on localhost with user `root` and the password specified in `.env`

5. **Run the application**:
   ```bash
   node index.js
   ```
   The server will start on the specified PORT (default 3000) and connect to the database.

## Notes

- The application uses ES modules (`type: "module"` in package.json)
- Database models are synced on startup (alter: false in production)
- CORS is configured to allow requests from the frontend URL
- Passwords are hashed using bcryptjs
- JWT tokens expire after 1 day
- Task statuses are predefined; ensure they exist in the database (id: 1=New, 2=Active, 3=Complete, 4=Failed)
