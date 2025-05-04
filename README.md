Task Management System
A modern task management application built with Next.js, MongoDB, and Socket.io for real-time updates.

Features:
Create, view, and manage tasks
Real-time updates using Socket.io
Task statistics dashboard
Due date tracking
Priority and status management
Modern UI with Tailwind CSS

Tech Stack:
Frontend: Next.js 14
Backend: Node.js with Express
Database: MongoDB (MongoDB Atlas)
Real-time Updates: Socket.io
UI Framework: Tailwind CSS
State Management: React Context API
Authentication: JWT

Prerequisites:
Node.js (v18 or higher)
MongoDB Atlas account
npm or yarn package manager

Installation:
1) Clone the repository:
git clone https://github.com/yourusername/task-management-system.git
cd task-management-system

2) Install dependencies:
npm install
# or
yarn install

3) Set up environment variables: Create a .env file in the root directory with the following content:
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/task-management?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:3000/api

4) Start the development server:
npm run dev
# or
yarn dev

5) Open http://localhost:3000 in your browser.
Project Structure

task-management-system/
├── app/
│   ├── api/
│   │   ├── socket/
│   │   │   ├── route.ts
│   │   │   └── middleware.ts
│   │   └── tasks/
│   │       └── route.ts
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   └── providers/
│       └── socket-provider.tsx
├── lib/
│   └── mongodb.ts
├── public/
└── .env

API Endpoints
Tasks API
GET /api/tasks - Fetch all tasks
POST /api/tasks - Create a new task

Socket.io
GET /api/socket - Socket.io connection endpoint
Events:
join - Join a user room
taskCreated - Emit when a new task is created
newTask - Receive new task updates

Development
Running the Application
1) Start the development server:
npm run dev

2) The application will be available at http://localhost:3000

Environment Variables
The application requires several environment variables to be set:
MONGODB_URI: MongoDB connection string
JWT_SECRET: Secret key for JWT authentication
NEXT_PUBLIC_API_URL: Base URL for API requests

Contributing
1) Fork the repository
2) Create your feature branch (git checkout -b feature/AmazingFeature)
3) Commit your changes (git commit -m 'Add some AmazingFeature')
4) Push to the branch (git push origin feature/AmazingFeature)
5) Open a Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details.

Support
For support, please open an issue in the GitHub repository.

Project Link: https://github.com/RishikaVootkur/Task-Management-System