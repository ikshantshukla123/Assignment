# **Organization Announcements Platform**

A full-stack web application where administrators can manage users and send real-time announcements to all users or specific individuals. The system supports secure authentication, role-based access control, and real-time updates.

---

## Features

- JWT-based authentication  
- Role-based access control (Admin, User)  
- Admin management (create and delete admins)  
- User management (create and delete users)  
- Real-time announcements using Socket.IO  
- Targeted announcements to specific users  
- Announcement persistence with database storage  
- Secure password hashing with bcrypt  
- Frontend route protection using Next.js middleware  

---

## Tech Stack

### Backend
- Node.js  
- Express  
- MongoDB with Mongoose  
- JWT (jsonwebtoken)  
- bcrypt  
- Socket.IO  

### Frontend
- Next.js (App Router)  
- Tailwind CSS  
- shadcn/ui  
- Socket.IO client  

---

## Project Structure

### Backend

```
backend/
├── src/
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── sockets
│   ├── config
│   ├── services
│   ├── app.js
│   └── server.js
└── package.json
```

### Frontend

```
frontend/
├── app/
│   ├── login
│   ├── dashboard
│   │   ├── admins
│   │   └── users
│   ├── layout.js
|   ├──  page.js
│   └── globals.css
├── components
├── hooks
├── lib
├── middleware.js
└── package.json
```

---

## Environment Variables

### Backend (`backend/.env`)

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@123
```

### Frontend (`frontend/.env.local`)

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

---

## Getting Started

### 1. Clone the repository

```bash
# Using HTTPS
git clone https://github.com/ikshantshukla123/Assignment.git

# Using SSH
git clone git@github.com:ikshantshukla123/Assignment.git

# Navigate to project directory
cd Assignment
```

### 2. Backend setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your database credentials

# Start development server
npm run dev
```

The backend server will start on `http://localhost:4000`.

An initial admin user is automatically created on first run.

### 3. Frontend setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Start development server
npm run dev
```

The frontend application will start on `http://localhost:3000`.

---

## Default Admin Credentials

- **Username:** admin
- **Password:** Admin@123

---

## Application Flow

1. User logs in and receives a JWT.  
2. JWT is stored in localStorage and cookies.  
3. Dashboard loads announcements using REST APIs.  
4. Socket.IO establishes an authenticated connection.  
5. New announcements are delivered in real time.  
6. On page refresh, announcements are restored from the database.  

---

## Security Notes

- Passwords are stored using bcrypt hashing.  
- Password fields are excluded from queries by default (`select: false`).  
- Frontend middleware is used only for route redirection.  
- All authentication and authorization checks are enforced on the backend.  

---

## Deployment

- Backend can be deployed on platforms like Render or Railway.  
- Frontend can be deployed on Vercel.  
- Environment variables must be configured on the hosting platform.  

---

## Author

Ikshant Shukla