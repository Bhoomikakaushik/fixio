# fixio

## In Development

This project is a backend API for user registration and authentication, built with Node.js, Express, and MongoDB. The current focus is on implementing user registration, login, logout, and profile retrieval with secure password handling and JWT-based authentication.

---

## Models

### User Model

Defined in [backend/models/userModel.js](backend/models/userModel.js):

- **fullName**:  
  - `firstName` (String, required, min 3 chars)  
  - `lastName` (String, optional)
- **email**: String, required, unique, min 5 chars
- **password**: String, required, min 6 chars
- **socketId**: String, optional
- **createdAt**: Date, defaults to now

---

## Routes

### User Registration

- **POST** `/api/v1/users/register`  
  Registers a new user.

  **Request Body:**
  ```json
  {
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```

  **Response:**
  - `201 Created` with user info and JWT token on success
  - `400 Bad Request` if required fields are missing or user exists
  - `500 Internal Server Error` on server error

### User Login

- **POST** `/api/v1/users/login`  
  Authenticates an existing user.

  **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```

  **Response:**
  - `200 OK` with user info and JWT token on success
  - `400 Bad Request` if email or password is missing, or credentials are invalid
  - `500 Internal Server Error` on server error

### User Profile

- **GET** `/api/v1/users/profile`  
  Returns the authenticated user's profile.  
  **Requires JWT token in cookie or Authorization header.**

  **Response:**
  - `200 OK` with user info on success
  - `404 Not Found` if user does not exist
  - `401 Unauthorized` if token is missing or invalid

### User Logout

- **POST** `/api/v1/users/logout`  
  Logs out the user by blacklisting the JWT token and clearing the cookie.  
  **Requires JWT token in cookie or Authorization header.**

  **Response:**
  - `200 OK` on successful logout
  - `400 Bad Request` if no token is provided
  - `500 Internal Server Error` on server error

---

## Captain Model

Defined in [`backend/models/captainModel.js`](backend/models/captainModel.js):

- **fullName**:  
  - `firstName` (String, required, min 3 chars)  
  - `lastName` (String, optional)
- **email**: String, required, unique, min 5 chars
- **password**: String, required, hashed
- **contact**: String, required, exactly 10 characters
- **profile_picture**: String, Cloudinary URL or default
- **address**: String, required
- **services_offered**: Array of Strings, required
- **isAvailable**: Boolean, default `false`
- **socketId**: String, optional
- **createdAt**: Date, defaults to now

---

## Captain Registration Route

- **POST** `/api/v1/captains/register`

  Registers a new captain.

  **Request Body:**
  ```json
  {
    "fullName": {
      "firstName": "Amit",
      "lastName": "Sharma"
    },
    "email": "amit.sharma@example.com",
    "password": "securePassword123",
    "address": "123 Main Street, Mumbai",
    "contact": "9876543210",
    "services_offered": ["Plumbing", "Electrical"],
    "isAvailable": true
  }
  ```

  **Response:**
  - `201 Created` with captain info and JWT token on success
  - `400 Bad Request` if required fields are missing or captain exists
  - `500 Internal Server Error` on server error

---

## Requirements for Register, Login, Profile, and Logout Features

- Node.js and npm installed
- MongoDB database (connection string in `.env`)
- Environment variables:
  - `PORT`
  - `JWT_SECRET`
  - `MONGO_URI`
- Install dependencies:
  ```sh
  npm install
  ```
- Start the server:
  ```sh
  node app.js
  ```

---

## File Structure

- [backend/models/userModel.js](backend/models/userModel.js) — User schema definition
- [backend/controllers/userController.js](backend/controllers/userController.js) — Registration, login, profile, and logout logic
- [backend/routes/userRoute.js](backend/routes/userRoute.js) — User-related routes
- [backend/utils/generateAuthToken.js](backend/utils/generateAuthToken.js) — JWT token generation
- [backend/db/init_db.js](backend/db/init_db.js)