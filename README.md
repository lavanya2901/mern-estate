Introduction
Project Title:
HomyHub

Team Members:
Lavanya S 
Kavishree k 
Dheekshitha R
Dhanashree
Table of Contents
Project Overview
Architecture
Setup Instructions
Folder Structure
Running the Application
API Documentation
Authentication
User Interface
Testing
Screenshots or Demo
Known Issues
Future Enhancements
1. Project Overview
Purpose:
HomyHub is a platform designed to provide users with a simple and secure way to manage their home-related activities, such as task management, inventory tracking, and connecting with service providers. The backend serves as the core API layer, handling authentication, data management, and interactions with the database.

Features:
User Authentication: Secure user registration and login using JWT (JSON Web Tokens).
Task Management: Full CRUD (Create, Read, Update, Delete) operations for managing tasks.
User Profiles: Each user has a personal profile for managing their data.
Data Persistence: Integration with MongoDB to store user data, tasks, and related information.
2. Architecture
Frontend:
The HomyHub frontend (if developed) is built using React.js. It communicates with the backend through REST API calls.
Backend:
Platform: Node.js with Express.js
The backend uses Express.js to handle API routes and middleware functions.
JWT tokens are used for user authentication and securing endpoints.
The server connects with MongoDB for storing and retrieving user and task data.
Database:
MongoDB is used for data storage.
Key Schemas:
User Schema: Fields include name, email, password, and tasks (which reference tasks created by the user).
Task Schema: Fields include taskTitle, taskDescription, status (In Progress, Completed), assignedDate, and dueDate.
3. Setup Instructions
Prerequisites:
Node.js (v14 or higher)
MongoDB (local instance or a cloud instance like MongoDB Atlas)
npm (Node package manager)
Installation:
Clone the Repository:
bash
Copy code
git clone https://github.com/skavi7904/HomyHub.git
Navigate to the Backend Directory:
bash
Copy code
cd HomyHub/backend
Install Dependencies:
bash
Copy code
npm install
Set Up Environment Variables:
Create a .env file in the backend directory with the following variables:
env
Copy code
MONGO_URI=<your-mongo-db-uri>
JWT_SECRET=<your-jwt-secret>
4. Folder Structure
Backend (Server):
plaintext
Copy code
backend/
├── controllers/        # Handles API logic (e.g., userController.js, taskController.js)
├── models/             # Mongoose schemas and models (e.g., userModel.js, taskModel.js)
├── routes/             # API routes (e.g., authRoutes.js, taskRoutes.js)
├── middleware/         # Middleware (e.g., authMiddleware.js)
├── config/             # Configuration (e.g., db.js, config.js)
├── server.js           # Main server entry point
└── package.json        # Backend dependencies and scripts
5. Running the Application
Frontend:
Assuming you have a frontend directory (client), run the following commands to start the React frontend:
bash
Copy code
cd client
npm start
Backend:
Navigate to the backend directory:
bash
Copy code
cd backend
Start the Node.js backend server:
bash
Copy code
npm start
6. API Documentation
Authentication Endpoints:
POST /api/auth/register

Description: Register a new user.
Request Body:
json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
Response:
json
Copy code
{
  "message": "User registered successfully"
}
POST /api/auth/login

Description: Log in an existing user.
Request Body:
json
Copy code
{
  "email": "john@example.com",
  "password": "securepassword"
}
Response:
json
Copy code
{
  "token": "JWT-TOKEN"
}
Task Endpoints:
GET /api/tasks

Description: Get all tasks for the logged-in user.
Response:
json
Copy code
[
  {
    "id": "task1",
    "taskTitle": "Buy groceries",
    "status": "Completed",
    "assignedDate": "2024-11-01",
    "dueDate": "2024-11-05"
  }
]
POST /api/tasks

Description: Create a new task.
Request Body:
json
Copy code
{
  "taskTitle": "Fix the plumbing",
  "taskDescription": "Repair the kitchen sink",
  "status": "In Progress",
  "assignedDate": "2024-11-10",
  "dueDate": "2024-11-15"
}
Response:
json
Copy code
{
  "message": "Task created successfully"
}
7. Authentication
JWT Authentication is used for secure authentication.
When a user logs in, a JWT is generated and returned.
The JWT is sent with each subsequent request in the Authorization header as Bearer <JWT-TOKEN>.
Middleware (authMiddleware.js) is used to validate the token and authorize access to protected routes.
8. User Interface
Frontend is handled by React in the client directory.
The backend integrates with the UI to support:
Task Management: User can create, edit, and delete tasks.
User Registration and Login: Secured using JWT authentication.
9. Testing
Testing Strategy:
Unit Tests: Using Jest for testing individual functions in the backend, such as user authentication and task creation.
Integration Tests: Supertest is used to test API endpoints (e.g., login, task creation).
MongoDB In-Memory: Uses a test database to ensure tests do not affect production data.
10. Screenshots or Demo
Link to Demo: You can provide a link to your live demo if available.
Screenshots:
User Registration Page
Task Dashboard
11. Known Issues
Database Connection: MongoDB connection may occasionally fail due to network issues. Verify that the MongoDB URI is correct and that the database is accessible.
Authentication Issue: Some users report that their JWT token expires unexpectedly, even though the expiry time is set correctly.
12. Future Enhancements
Real-Time Task Updates: Implement WebSocket or Socket.io to allow real-time updates for tasks.
Task Reminders: Add email/SMS notifications for upcoming tasks or deadlines.
User Roles: Introduce user roles like "Admin" or "Manager" to allow more granular permissions for task management.
