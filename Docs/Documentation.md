# Flex Yoga Class Admission Portal Documentation

## Table of Contents

1. [Introduction](#1-introduction)
   - [1.1 Purpose](#11-purpose)
   - [1.2 Scope](#12-scope)
   - [1.3 Assumptions and Constraints](#13-assumptions-and-constraints)

2. [System Overview](#2-system-overview)
   - [2.1 Overview](#21-overview)
   - [2.2 Architecture](#22-architecture)
   - [2.3 Technologies Used](#23-technologies-used)

3. [User Documentation](#3-user-documentation)
   - [3.1 Accessing the Yoga Class Admission Portal](#31-accessing-the-yoga-class-admission-portal)
   - [3.2 User Guide](#32-user-guide)

4. [Developer Documentation](#4-developer-documentation)
   - [4.1 Project Structure](#41-project-structure)
   - [4.2 Setting Up Development Environment](#42-setting-up-development-environment)
   - [4.3 Running the Application](#43-running-the-application)
   - [4.4 API Endpoints](#44-api-endpoints)
   - [4.5 Database Schema](#45-database-schema)

5. [Testing](#5-testing)
   - [5.1 Manual Testing](#51-manual-testing)
   
6. [Deployment](#6-deployment)
   - [6.1 Dockerization](#61-dockerization)
   - [6.2 Deployment Platforms](#62-deployment-platforms)

7. [Future Scopes](#7-future-scopes)
8. [Conclusion](#8-conclusion)

## 1. Introduction

### 1.1 Purpose

The purpose of this document is to provide comprehensive documentation for the development of an admission form for monthly Yoga Classes.

### 1.2 Scope

The scope of this project includes designing and developing an admission form that allows individuals within the age range of 18-65 to enroll for monthly Yoga Classes. The form facilitates monthly fee payments, batch selection, and batch change requests. The primary focus is on providing a user-friendly experience for participants to seamlessly enroll, pay fees, and manage their class preferences.

### 1.3 Assumptions and Constraints

- Participants cannot pay fees in advance; fees must be paid on a month-to-month basis.
- If a participant misses paying fees for the current month, their classes for the next month will be suspended, and they need to contact the administrator to resume.
- Participants cannot change batches for the current month; batch changes are allowed only for the next month.
- Participants belong to the Indian geographical region.
- Payments are simulated and considered dummy transactions.
- Fees for a month is fixed, and is INR 500

## 2. System Overview

### 2.1 Overview

The Yoga Class Admission Portal serves as an efficient solution for individuals to enroll in monthly Yoga Classes. It ensures compliance with age restrictions, monthly fee payments, and flexible batch preferences. Participants can seamlessly navigate the admission process, including enrollment, fee payments, and batch selection.

### 2.2 Architecture

The system architecture is designed following a microservices-based approach, promoting scalability, maintainability, and modularity. Additionally, it adopts a multi-tier architecture, specifically three-tier, to separate concerns and improve overall system organization.

#### 2.2.1 Microservices

The application is structured into microservices, each responsible for specific functionalities:

- **Frontend Microservice:** Manages the user interface, interaction, and presentation layer. It is responsible for providing an intuitive and responsive user experience.

- **Backend Microservice:** Handles the logic and business rules of the application. It processes requests from the frontend, interacts with the database, and manages user enrollment, batch preferences, and payments.

- **Database Microservice:** Represents the PostgreSQL database responsible for storing and retrieving participant information, batch details, and payment history. It ensures data integrity and provides a reliable storage solution.

#### 2.2.2 Three-Tiered Architecture

The application adopts a three-tiered architecture to organize components into layers based on their functions. The three main tiers are:

- **Presentation Tier:** This tier includes the Frontend Microservice, responsible for user interaction and presentation. It communicates with the Backend Microservice to request and display data.

- **Application Tier:** The Backend Microservice resides in this tier, managing the core application logic, processing requests from the frontend, and orchestrating interactions with the Database Microservice.

- **Data Tier:** The Database Microservice, representing the PostgreSQL database, is part of this tier. It stores and retrieves data, ensuring the persistence and availability of participant information.

### 2.3 Technologies Used

- **Frontend:** React, HTML5, JavaScript, Bootstrap
- **Backend:** Flask, Python
- **Database:** PostgreSQL
- **Deployment:** Netlify (Frontend), Render (Backend)
- **Containerization:** Docker
- **Orchestration:** Docker Compose

## 3. User Documentation

### 3.1 Accessing the Yoga Class Admission Portal

To access the Yoga Class Admission Portal, follow these steps:

1. Open your web browser and navigate to the provided Frontend URL: [https://flex-yoga-admission-portal.netlify.app/](https://flex-yoga-admission-portal.netlify.app/)

2. On the homepage, you will be greeted with a welcome message and two links for New Admission & Existing Admission.

### 3.2 User Guide

#### 3.2.1 Enrolling in Yoga Classes

1. Click on the "Enroll Now" button to initiate the admission process.

2. Fill in the admission form with your details, including username, password,confirm password, name, age, and contact.

3. Select your preferred batch for the upcoming month.

4. Choose between two enrollment options:
    - **Enroll & Pay Later:** Complete the admission process without making an immediate payment.
    - **Enroll & Pay:** Make the monthly fee payment during the enrollment process.

#### 3.2.2 Logging In

1. Navigate to the "Login" page.

2. Enter your username and password.

3. Click the "Login" button.

#### 3.2.3 Batch Change Request

1. Access the "Batch Change Request" section.

2. You can see your current yoga batch there.

3. Select the new batch you wish to join next month.

4. Submit the batch change request.

#### 3.2.4 Paying Fee Dues

1. Visit the "Payment" section.

2. Enter pay the due fees amount till current month if any.

3. Complete the payment process.

## 4. Developer Documentation

### 4.1 Project Structure

The project is structured into frontend and backend components:

#### Frontend
- **Directory:** `frontend`
- **Framework:** React
- **Additional Tools:** Vite, Bootstrap
- **Deployment:** Netlify
- **Containerization:** Docker

#### Backend
- **Directory:** `backend`
- **Framework:** Flask
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Additional Tools:** Bcrypt, CORS, Flask-SQLAlchemy
- **Deployment:** Render
- **Containerization:** Docker

### 4.2 Setting Up Development Environment

#### Frontend

To set up the frontend development environment, follow these steps:

1. Navigate to the `frontend` directory.

2. Create an `.env` file with the following content:
   ```env
   VITE_API_BASE_URL="http://localhost:5000"
   ```

3. Run the following commands:
   ```bash
   npm install
   ```

#### Backend

To set up the backend development environment, follow these steps:

1. Navigate to the `backend` directory.

2. Create an `.env` file with the following content:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/yoga_class"
   ```

   Replace `user` and `password` with your PostgreSQL credentials.

3. Run the following commands:
   ```bash
   pip install -r requirements.txt
   ```

### 4.3 Running the Application

#### Frontend

To run the frontend locally, execute the following commands:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be accessible at [http://localhost:5173](http://localhost:5173).

#### Backend

To run the backend locally, execute the following commands:

```bash
# Navigate to the backend directory
cd backend

# Start the backend server
python flex-yoga-app.wsgi
```

The backend will be accessible at [http://localhost:5000](http://localhost:5000).

Note: Ensure that you have a PostgreSQL server running locally with the specified credentials.

### 4.4 API Endpoints

#### 4.4.1 Home
- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Welcomes users to the Yoga Class App.

#### 4.4.2 Create User
- **Endpoint:** `/create_user`
- **Method:** `POST`
- **Description:** Creates a new user for the Yoga Class App and enrolls them in the specified batch.

  **Request Body:**
  ```json
  {
    "username": "example_username",
    "password": "example_password",
    "name": "John Doe",
    "age": 25,
    "contact": "1234567890",
    "batch": 1
  }
  ```

  **Response:**
  - **Success (Status Code 201):**
    ```json
    {
      "message": "User created successfully"
    }
    ```
  - **Error (Status Code 400 or 500):**
    ```json
    {
      "error": "Error message"
    }
    ```

#### 4.4.3 Login
- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Validates user credentials for login.

  **Request Body:**
  ```json
  {
    "username": "example_username",
    "password": "example_password"
  }
  ```

  **Response:**
  - **Success (Status Code 200):**
    ```json
    {
      "message": "Login successful"
    }
    ```
  - **Error (Status Code 401):**
    ```json
    {
      "error": "Invalid credentials"
    }
    ```

#### 4.4.4 Batch Change Request
- **Endpoint:** `/batch-change`
- **Method:** `POST`
- **Description:** Initiates a request to change the user's yoga batch for the next month.

  **Request Body:**
  ```json
  {
    "username": "example_username",
    "new_batch_id": 2
  }
  ```

  **Response:**
  - **Success (Status Code 200):**
    ```json
    {
      "message": "Request Processed Successfully"
    }
    ```
  - **Error (Status Code 500):**
    ```json
    {
      "error": "Error message"
    }
    ```

#### 4.4.5 Get Current Batch
- **Endpoint:** `/get-current-batch`
- **Method:** `GET`
- **Description:** Retrieves the user's current yoga batch.

  **Query Parameters:**
  - `username` (string): User's username

  **Response:**
  - **Success (Status Code 200):**
    ```json
    {
      "current_batch": 1,
      "batch": "6-7AM"
    }
    ```
  - **Error (Status Code 404):**
    ```json
    {
      "error": "No records found for username: example_username"
    }
    ```

#### 4.4.6 Complete Payment
- **Endpoint:** `/complete-payment`
- **Method:** `POST`
- **Description:** Records the completion of a payment for the user.

  **Request Body:**
  ```json
  {
    "username": "example_username",
    "amount": 500
  }
  ```

  **Response:**
  - **Success (Status Code 200):**
    ```json
    {
      "message": "Payment Processed Successfully"
    }
    ```
  - **Error (Status Code 500):**
    ```json
    {
      "error": "Error message"
    }
    ```

#### 4.4.7 Get Payment Status
- **Endpoint:** `/get-payment-status`
- **Method:** `GET`
- **Description:** Retrieves the payment status for the user.

  **Query Parameters:**
  - `username` (string): User's username

  **Response:**
  - **Success (Status Code 200):**
    ```json
    {
      "due_status": true,
      "amount": 500
    }
    ```
  - **Error (Status Code 404):**
    ```json
    {
      "error": "No records found for username: example_username"
    }
    ```

#### 4.4.8 Get Active Status
- **Endpoint:** `/get-active-status`
- **Method:** `GET`
- **Description:** Retrieves the active status for the user.

  **Query Parameters:**
  - `username` (string): User's username

  **Response:**
  - **Success (Status Code 200):**
    ```json
    {
      "is_active": true
    }
    ```
  - **Error (Status Code 500):**
    ```json
    {
      "error": "Error message"
    }
    ```

### 4.5 Database Schema

#### 4.5.1 Entity Relationship (ER) Diagram

![ER Diagram](./images/ER_Diagram.svg)

#### 4.5.2 Tables

##### 4.5.2.1 User Table

- **Columns:**
  - `username` (primary key, varchar(50))
  - `password` (text)
  - `name` (text)
  - `age` (int, CheckConstraint('age >= 18 AND age <= 65'))
  - `contact` (varchar(20))
  - `joined_date` (timestamp, Default: current timestamp)
  - `is_active` (boolean, Default: True)

##### 4.5.2.2 Batches Table

- **Columns:**
  - `batch_id` (primary key, int)
  - `batch` (varchar(50))

##### 4.5.2.3 BatchChangeRequest Table

- **Columns:**
  - `id` (primary key, int)
  - `username` (foreign key (User), varchar(50))
  - `requested_time` (timestamp, Default: current timestamp + 1 month)
  - `batch_id` (foreign key (Batches), int)

##### 4.5.2.4 PaymentHistory Table

- **Columns:**
  - `id` (primary key, int)
  - `username` (foreign key (User), varchar(50))
  - `time_of_payment` (timestamp, Default: current timestamp)
  - `amount` (int, Default: 500)

#### 4.5.3 Relationships

- **User -> BatchChangeRequest:** One-to-Many relationship on `username`
- **User -> PaymentHistory:** One-to-Many relationship on `username`
- **Batches -> BatchChangeRequest:** One-to-Many relationship on `batch_id`

#### 4.5.4 Constraints

- **User -> age:** Check constraint to ensure age is between 18 and 65
- **BatchChangeRequest -> requested_time:** Default constraint to set `requested_time` to current timestamp + 1 month

## 5. Testing

### 5.1 Manual Testing

#### 5.1.1 Frontend

The frontend of the Flex Yoga Class Admission Portal is tested manually. Follow these steps to perform manual testing:

1. Open the frontend application at [https://flex-yoga-admission-portal.netlify.app/](https://flex-yoga-admission-portal.netlify.app/) or locally on `localhost`.

2. Navigate through the user interface to simulate user actions, including:
   - Filling up the admission form.
   - Logging in and out.
   - Changing the yoga batch for the next month.
   - Making fee payments.

3. Observe the application's responsiveness and user experience.

#### 5.1.2 Backend (APIs)

The backend APIs can be manually tested using Postman or any API testing tool. Follow these steps to test the APIs:

1. Open Postman or your preferred API testing tool.

2. Use the provided API endpoints along with the specified request formats to perform the following tests:

   - Create a new user: Send a POST request to `/create_user` with the required user details.
   - Login: Send a POST request to `/login` with valid login credentials.
   - Batch Change Request: Send a POST request to `/batch-change` with a valid batch change request.
   - Get Current Batch: Send a GET request to `/get-current-batch` with a valid username.
   - Complete Payment: Send a POST request to `/complete-payment` with valid payment details.
   - Get Payment Status: Send a GET request to `/get-payment-status` with a valid username.
   - Get Active Status: Send a GET request to `/get-active-status` with a valid username.

3. Verify that the responses match the expected outcomes as described in the API documentation.

## 6. Deployment

### 6.1 Dockerization

The Flex Yoga Class Admission Portal is containerized using Docker to ensure consistent deployment across different environments. The Docker setup includes two main containers for the frontend and backend components. Below are the details of the Dockerization process:

#### 6.1.1 Frontend Container

The frontend container is built using the following steps:

1. A Dockerfile is created in the `frontend` directory to define the container's configuration.

   ```dockerfile
   # frontend/Dockerfile
   FROM node:14

   WORKDIR /app

   COPY package*.json ./

   RUN npm install

   COPY . .

   CMD ["npm", "run", "build"]
   ```

2. The Dockerfile specifies the base image as `node:14`, sets the working directory, installs dependencies, and copies the application files.

3. The container is built using the following command:

   ```bash
   docker build -t frontend ./frontend
   ```

4. Once built, the container can be run locally using:

   ```bash
   docker run -p 5173:5173 frontend
   ```

#### 6.1.2 Backend Container

Similar to the frontend, the backend container is built with its own Dockerfile:

1. A Dockerfile is created in the `backend` directory to define the container's configuration.

   ```dockerfile
   # backend/Dockerfile
   FROM python:3.8

   WORKDIR /app

   COPY requirements.txt .

   RUN pip install --no-cache-dir -r requirements.txt

   COPY . .

   CMD ["python", "flex-yoga-app.wsgi"]
   ```

2. The Dockerfile specifies the base image as `python:3.8`, sets the working directory, installs Python dependencies, and copies the application files.

3. The container is built using the following command:

   ```bash
   docker build -t backend ./backend
   ```

4. Once built, the container can be run locally using:

   ```bash
   docker run -p 5000:5000 backend
   ```

Thank you for the clarification. Here's an updated section for the backend deployment on Render:

### 6.2 Deployment Platforms

The Flex Yoga Class Admission Portal is deployed on the following platforms:

#### 6.2.1 Frontend Deployment on Netlify

The frontend of the application is deployed on [Netlify](https://www.netlify.com/). Netlify simplifies the deployment process and provides continuous integration capabilities.

- The deployment settings are configured through the `netlify.toml` file in the root directory.

  ```toml
  # netlify.toml
  [build]
    command = "npm run build"
    publish = "frontend/dist"
  ```

- The Netlify platform automatically detects changes in the repository and triggers deployment accordingly.

- The live frontend application is accessible at [https://flex-yoga-admission-portal.netlify.app/](https://flex-yoga-admission-portal.netlify.app/).

#### 6.2.2 Backend Deployment on Render

The backend of the application is deployed on [Render](https://render.com/). Render provides a simple and scalable platform for hosting applications.

- The deployment settings for the backend are configured through the `render.yaml` file in the root directory.

  ```yaml
  # render.yaml
  services:
    - name: backend
      plan: starter
      build_command: pip install -r requirements.txt
      start_command: python main.py
  ```

- Render automatically builds and deploys the backend application based on the specified settings. In this case, it uses `main.py` as the entry point and runs `pip install -r requirements.txt` for the build.

- The live backend application is accessible at [https://flex-yoga-app.onrender.com](https://flex-yoga-app.onrender.com).

## 7. Future Scopes

1. **Administrator Dashboard:** Introduce an administrator page to manage participants efficiently. Administrators can suspend or resume participant accounts based on fee dues, facilitating streamlined class management.

2. **Notification System:** Implement a notification system to alert participants about upcoming fee dues at the end of the current month. This feature enhances user experience by providing timely reminders.

3. **Real Payments Integration:** Explore integrating real payment gateways like Razorpay, Stripe, or Paytm for authentic and secure transactions. This addition will enable participants to make actual payments seamlessly.

4. **Infrastructure Scaling:** Evaluate the application's infrastructure to ensure it can handle increased traffic. Consider cloud platforms like AWS, Azure, or GCP for scalable and reliable infrastructure management. Implement load balancing and auto-scaling mechanisms to handle varying workloads.

5. **Caching Mechanisms:** Implement caching mechanisms to reduce the load on backend services. Utilize caching solutions like Redis or Memcached to store frequently accessed data, enhancing overall system responsiveness.

6. **Asynchronous Processing:** Introduce asynchronous processing for non-time-sensitive tasks, such as notifications and background jobs. Implement message queues (e.g., RabbitMQ or Kafka) to decouple components and improve system responsiveness.

7. **Continuous Integration and Deployment (CI/CD):** Implement CI/CD pipelines to automate testing, build, and deployment processes. This accelerates development cycles, reduces manual errors, and ensures a smooth release process for new features and updates.

## 8. Conclusion
The Flex Yoga Class Admission Portal offers a user-friendly solution for monthly yoga class enrollment, integrating React for the frontend and Flask for the backend. With features like age-specific registration, monthly payments, and flexible batch preferences, the portal caters to diverse user needs. Leveraging Docker for containerization and deploying on Netlify and Render, the application ensures scalability and ease of maintenance. 