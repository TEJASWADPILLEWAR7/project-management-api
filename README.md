# 🚀 Project Management API

A robust RESTful backend API for managing **users, projects, project members, roles, and authentication**.

Built with **Node.js, Express.js, MongoDB, and Mongoose**, this API provides secure JWT-based authentication, role-based project access, email verification, password recovery, and project member management.

---

## 📌 Project Overview

The **Project Management API** is a backend application designed to provide the core functionality required for a project management system.

It supports:

- 🔐 User authentication and authorization
- 👤 User registration and login
- ✉️ Email verification
- 🔑 Forgot and reset password functionality
- 🔄 Access and refresh token authentication
- 🔒 Password change functionality
- 📁 Project creation and management
- 👥 Project member management
- 🛡️ Role-based access control
- 📧 Email delivery using Nodemailer and Mailtrap
- ✅ Request validation using Express Validator

---

## 🛠️ Tech Stack

### Backend

- **Node.js**
- **Express.js 5.2.1**

### Database

- **MongoDB**
- **Mongoose 9.9.5**

### Authentication & Security

- **JSON Web Token (JWT)**
- **Bcrypt**
- **Cookie Parser**
- **CORS**

### Validation

- **Express Validator**

### Email

- **Nodemailer**
- **Mailgen**
- **Mailtrap**

### Development Tools

- **Nodemon**
- **Prettier**

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- JWT access token
- JWT refresh token
- Get current authenticated user
- Logout
- Change password
- Forgot password
- Reset password
- Email verification
- Resend email verification

### 📁 Project Management

- Create projects
- View user's projects
- View project details
- Update projects
- Delete projects

### 👥 Project Members

- View project members
- Add members to projects
- Update member roles
- Remove members from projects

### 🛡️ Role-Based Access Control

Supported project roles:

- `admin`
- `project_admin`
- `member`

---

# 📋 API Documentation

## Base URL

For local development:

```text
http://localhost:3000/api/v1
```

---

# ❤️ Healthcheck

## Check Server Status

Checks whether the API server is running.

### Endpoint

```http
GET /healthcheck
```

### Authentication

Not required.

### Response

```json
{
  "statusCode": 200,
  "data": {
    "message": "Server is running"
  },
  "message": "Success",
  "success": true
}
```

---

# 🔐 Authentication API

Base route:

```text
/api/v1/auth
```

---

## Register User

Creates a new user account.

### Endpoint

```http
POST /auth/register
```

### Authentication

Not required.

### Request Body

```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "password123",
  "fullName": "John Doe"
}
```

---

## Login

Authenticates a user and returns access and refresh tokens.

### Endpoint

```http
POST /auth/login
```

### Authentication

Not required.

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Example Response

```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "6aa13e3f072d8dd99f1c98bc",
      "username": "johndoe",
      "email": "user@example.com",
      "isEmailVerified": false
    },
    "accessToken": "eyJhbGciOi...",
    "refreshToken": "eyJhbGciOi..."
  },
  "message": "User logged in successfully",
  "success": true
}
```

---

## Get Current User

Returns information about the currently authenticated user.

### Endpoint

```http
POST /auth/current-user
```

### Authentication

Required.

```http
Authorization: Bearer <ACCESS_TOKEN>
```

---

## Refresh Access Token

Generates a new access token using a refresh token.

### Endpoint

```http
POST /auth/refresh-token
```

### Authentication

Not required.

### Request Body

```json
{
  "refreshToken": "eyJhbGciOi..."
}
```

---

## Logout

Logs out the currently authenticated user.

### Endpoint

```http
POST /auth/logout
```

### Authentication

Required.

```http
Authorization: Bearer <ACCESS_TOKEN>
```

---

## Change Password

Changes the password of the authenticated user.

### Endpoint

```http
POST /auth/change-password
```

### Authentication

Required.

```http
Authorization: Bearer <ACCESS_TOKEN>
```

### Request Body

```json
{
  "oldPassword": "password123",
  "newPassword": "newpassword123"
}
```

---

## Forgot Password

Sends a password reset email to the user.

### Endpoint

```http
POST /auth/forgot-password
```

### Authentication

Not required.

### Request Body

```json
{
  "email": "user@example.com"
}
```

---

## Reset Password

Resets the user's password using a valid reset token.

### Endpoint

```http
POST /auth/reset-password/:resetToken
```

### Authentication

Not required.

### Request Body

```json
{
  "newPassword": "newpassword123"
}
```

---

## Verify Email

Verifies the user's email address.

### Endpoint

```http
GET /auth/verify-email/:verificationToken
```

### Authentication

Not required.

---

## Resend Email Verification

Resends the email verification email.

### Endpoint

```http
POST /auth/resend-email-verification
```

### Authentication

Required.

```http
Authorization: Bearer <ACCESS_TOKEN>
```

---

# 📁 Project API

Base route:

```text
/api/v1/projects
```

> All project routes require authentication unless otherwise specified.

---

## Create Project

Creates a new project.

### Endpoint

```http
POST /projects
```

### Permission

Authenticated user.

### Request Body

```json
{
  "name": "Project Name",
  "description": "Project Description"
}
```

---

## Get All User Projects

Returns all projects associated with the authenticated user.

### Endpoint

```http
GET /projects
```

### Permission

Authenticated user.

---

## Get Project By ID

Returns information about a specific project.

### Endpoint

```http
GET /projects/:projectId
```

### Permission

Project member.

---

## Update Project

Updates project information.

### Endpoint

```http
PUT /projects/:projectId
```

### Permission

Project admin.

### Request Body

```json
{
  "name": "Updated Project Name",
  "description": "Updated Description"
}
```

---

## Delete Project

Deletes a project.

### Endpoint

```http
DELETE /projects/:projectId
```

### Permission

Project admin.

---

# 👥 Project Member API

---

## Get Project Members

Returns all members of a project.

### Endpoint

```http
GET /projects/:projectId/members
```

### Permission

Authenticated user.

---

## Add Member

Adds an existing user to a project.

### Endpoint

```http
POST /projects/:projectId/members
```

### Permission

Project admin.

### Request Body

```json
{
  "email": "member@example.com",
  "role": "member"
}
```

### Available Roles

| Role            | Description                |
| --------------- | -------------------------- |
| `admin`         | Project administrator      |
| `project_admin` | Project administrator role |
| `member`        | Regular project member     |

---

## Update Member Role

Updates the role of a project member.

### Endpoint

```http
PUT /projects/:projectId/members/:userId
```

### Permission

Project admin.

### Request Body

```json
{
  "newRole": "project_admin"
}
```

---

## Remove Member

Removes a member from a project.

### Endpoint

```http
DELETE /projects/:projectId/members/:userId
```

### Permission

Project admin.

---

# 🔑 Authentication

Protected API endpoints require a valid JWT access token.

Send the access token through the `Authorization` header:

```http
Authorization: Bearer <ACCESS_TOKEN>
```

### Example

```http
GET /api/v1/projects
Authorization: Bearer eyJhbGciOi...
```

---

# 🌱 Environment Variables

Create a `.env` file in the **root directory** of the project.

```env
PORT=3000

MONGO_URI=mongodb://localhost:27017/projmanagement

CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

MAILTRAP_SMTP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your_mailtrap_user
MAILTRAP_SMTP_PASS=your_mailtrap_password

FORGOT_PASSWORD_REDIRECT_URL=http://localhost:5173/reset-password

SERVER_URL=http://localhost:3000
```

## Environment Variable Description

| Variable                       | Description                           |
| ------------------------------ | ------------------------------------- |
| `PORT`                         | Port on which the Express server runs |
| `MONGO_URI`                    | MongoDB connection string             |
| `CORS_ORIGIN`                  | URL of the frontend application       |
| `ACCESS_TOKEN_SECRET`          | Secret used to sign access tokens     |
| `ACCESS_TOKEN_EXPIRY`          | Access token expiration time          |
| `REFRESH_TOKEN_SECRET`         | Secret used to sign refresh tokens    |
| `REFRESH_TOKEN_EXPIRY`         | Refresh token expiration time         |
| `MAILTRAP_SMTP_HOST`           | Mailtrap SMTP host                    |
| `MAILTRAP_SMTP_PORT`           | Mailtrap SMTP port                    |
| `MAILTRAP_SMTP_USER`           | Mailtrap SMTP username                |
| `MAILTRAP_SMTP_PASS`           | Mailtrap SMTP password                |
| `FORGOT_PASSWORD_REDIRECT_URL` | Frontend password reset URL           |
| `SERVER_URL`                   | Backend server URL                    |

> ⚠️ **Never commit your `.env` file or real secrets to GitHub.**

---

# 🚀 Getting Started

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- MongoDB
- Git
- npm

---

## 1. Clone the Repository

```bash
git clone https://github.com/TEJASWADPILLEWAR7/project-management-api.git
```

Move into the project directory:

```bash
cd project-management-api
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file:

```bash
touch .env
```

Then add your environment variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/projmanagement
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

MAILTRAP_SMTP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your_mailtrap_user
MAILTRAP_SMTP_PASS=your_mailtrap_password

FORGOT_PASSWORD_REDIRECT_URL=http://localhost:5173/reset-password
SERVER_URL=http://localhost:3000
```

---

## 4. Start MongoDB

Make sure your MongoDB server is running.

For a local MongoDB installation, the connection string can be:

```text
mongodb://localhost:27017/projmanagement
```

If you are using **MongoDB Atlas**, replace `MONGO_URI` with your Atlas connection string.

Example:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/projmanagement
```

---

## 5. Start Development Server

Run:

```bash
npm run dev
```

The development server will start using Nodemon.

---

## 6. Start Production Server

Run:

```bash
npm start
```

---

# 📡 API Route Summary

| Method   | Endpoint                                | Auth | Permission     |
| -------- | --------------------------------------- | ---- | -------------- |
| `GET`    | `/healthcheck`                          | ❌   | Public         |
| `POST`   | `/auth/register`                        | ❌   | Public         |
| `POST`   | `/auth/login`                           | ❌   | Public         |
| `POST`   | `/auth/current-user`                    | ✅   | Authenticated  |
| `POST`   | `/auth/refresh-token`                   | ❌   | Public         |
| `POST`   | `/auth/logout`                          | ✅   | Authenticated  |
| `POST`   | `/auth/change-password`                 | ✅   | Authenticated  |
| `POST`   | `/auth/forgot-password`                 | ❌   | Public         |
| `POST`   | `/auth/reset-password/:resetToken`      | ❌   | Public         |
| `GET`    | `/auth/verify-email/:verificationToken` | ❌   | Public         |
| `POST`   | `/auth/resend-email-verification`       | ✅   | Authenticated  |
| `POST`   | `/projects`                             | ✅   | Authenticated  |
| `GET`    | `/projects`                             | ✅   | Authenticated  |
| `GET`    | `/projects/:projectId`                  | ✅   | Project Member |
| `PUT`    | `/projects/:projectId`                  | ✅   | Project Admin  |
| `DELETE` | `/projects/:projectId`                  | ✅   | Project Admin  |
| `GET`    | `/projects/:projectId/members`          | ✅   | Authenticated  |
| `POST`   | `/projects/:projectId/members`          | ✅   | Project Admin  |
| `PUT`    | `/projects/:projectId/members/:userId`  | ✅   | Project Admin  |
| `DELETE` | `/projects/:projectId/members/:userId`  | ✅   | Project Admin  |

---

# 📂 Project Structure

The project is organized around the `src` directory.

A typical structure is:

```text
project-management-api/
│
├── src/
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
├── .env
├── .gitignore
├── .prettierignore
├── .prettierrc
├── package.json
├── package-lock.json
├── PRD.md
└── README.md
```

> Update the structure above if your actual `src` folders differ.

---

# 🧪 NPM Scripts

The project provides the following scripts:

| Command       | Description                           |
| ------------- | ------------------------------------- |
| `npm install` | Install dependencies                  |
| `npm run dev` | Start development server with Nodemon |
| `npm start`   | Start production server               |

---

# 📮 Testing the API

You can test the API using tools such as:

- Postman
- Insomnia
- Thunder Client
- cURL
- Frontend applications

### Example Healthcheck

```bash
curl http://localhost:3000/api/v1/healthcheck
```

### Example Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

---

# 🔒 Security Notes

- Store JWT secrets securely.
- Never commit `.env` files.
- Use strong passwords in production.
- Use a secure MongoDB connection in production.
- Configure `CORS_ORIGIN` to your actual frontend URL.
- Do not expose Mailtrap credentials publicly.
- Use HTTPS when deploying the application to production.

---

# 📦 Dependencies

Main dependencies used by this project include:

```text
bcrypt
cookie-parser
cors
crypto
dotenv
express
express-validator
jsonwebtoken
mailgen
mongoose
nodemailer
```

Development dependencies:

```text
nodemon
prettier
```

---

# 👨‍💻 Author

**Tejas Wadpillewar**

- 🌐 **Portfolio:** https://tejaswadpillewar.site
- 💻 **GitHub:** https://github.com/TEJASWADPILLEWAR7
- 📦 **Project Repository:** https://github.com/TEJASWADPILLEWAR7/project-management-api

---

# 📄 License

This project is licensed under the **ISC License**.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

# 📄 License

This project is licensed under the **ISC License**.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**Repository:**
https://github.com/TEJASWADPILLEWAR7/project-management-api
