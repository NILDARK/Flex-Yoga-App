# Flex Yoga Class Admission Portal

## Overview
Welcome to the Flex Yoga Class Admission Portal! This application serves as an admission form for monthly yoga classes, allowing users to enroll in different batches, make monthly payments, and manage their class preferences. The portal is designed to be user-friendly, adhering to specific requirements such as age limitations, monthly payments, and batch preferences.

### Assumptions while Solving the Problem Statement

1. **Payment Basis:**
   - Participants cannot pay fees in advance; fees must be paid on a month-to-month basis.

2. **Fee Dues and Class Suspension:**
   - If a participant misses paying fees for the current month, their classes for the next month will be suspended.
   - To resume classes, participants need to contact the Flex Yoga Class administrator.
   - Only fee dues for the current month are allowed.

3. **Batch Change Restrictions:**
   - Participants cannot change their batch for the current month or any month except the next month.

4. **Geographical Region:**
   - Participants are assumed to belong to the Indian geographical region.

5. **Payment Simulations:**
   - Payments made by participants are considered dummy transactions for simulation purposes.

6. **Fixed Fees:**
   - Fees for a month is fixed and is INR 500/-

### Essential Features

1. **Admission Form and Sign Up:**
   - Participants can fill up the admission form and sign up.
   - Two enrollment options: "Enroll & Pay Later" and "Enroll & Pay."
   - All form fields are validated. 
2. **Age Group Validation:**
   - Participants' admission is allowed only if they belong to the valid age group of 18-65.

3. **Login/Logout Functionality:**
   - Participants can log in and log out using the credentials used during admission.

4. **Batch Change Request:**
   - Participants can initiate a batch change request for the next month.

5. **Fee Payment:**
   - Participants can pay fee dues for the current month if any.

### Salient Features

1. **View Current Month Yoga Batch:**
   - Participants can view their assigned yoga batch for the current month.

2. **Payment of Due Payments:**
   - Participants can pay all due payments in case of suspension, provided it's allowed by the administrator.

3. **User Data Retention:**
   - User data will be retained once logged in until the participant logs out.

4. **Hashing and Salt:**
    - System uses hashing and adding salt method to store user creds into database as a best practiced security protocol
Certainly! Below is the updated "Approach" section with the equation for calculating fee dues:

## Approach

### Backend:

#### Requirements Analysis:

The first step involved a comprehensive analysis of the requirements:

1. **Unique Identifier (Username):** As enrollment is a key aspect, a unique identifier (username) was deemed essential.
   
2. **Authentication and Login Functionality:** Payment functionalities necessitated user authentication, leading to the implementation of a login system.

3. **Timestamps for User Creation:** To calculate payment dues, a timestamp was stored for each user creation.

4. **Active Flag:** An "active" flag was introduced to indicate whether a participant's enrollment is currently suspended or active.

5. **Timestamps for Payment Records:** Timestamps were stored for every payment, facilitating the determination of fee due status.

6. **Batch Change Request Timestamps:** For efficient batch change functionality, timestamps were logged for batch change requests, with an additional timestamp representing the date of the month for which the batch needs to be changed.

#### Implementation Details:

- **Unique Identifier (Username) Requirement:** Implemented a unique username as the primary key for user records.
  
- **Authentication:** Authentication was achieved through a secure login system.
  
- **Timestamps Management:** The necessary timestamps for user creation, payment records, and batch change requests were efficiently managed to ensure accurate calculations.

- **Batch Change Logic:** Determining the current month's batch involved querying the last batch change request's batch ID with a timestamp strictly less than the current timestamp.

- **Fee Due Calculation:** Calculating total fee dues was accomplished using the equation:

  ```plaintext
  diff = (current_year - last_payment_year) * 12 + current_month - last_payment_month
  total_due_amount = diff * monthly_fees
  ```

- **Batch Change Request on First Enrollment:** A batch change request was automatically triggered during the user's first enrollment, guaranteeing the existence of at least one record for the user.

### Frontend:

The frontend development followed a straightforward approach aligned with the problem statement:

#### Component Structure:

- **Admission Page:** Implemented an admission form page to gather required participant details.
  
- **Existing Page:** Created a page featuring a login form, batch change component, and payment component.

#### Logic and State Management:

- **Conditional Component Rendering:** To avoid unnecessary routing and prop passing, components were conditionally rendered based on the user's login status.

- **Use of Loading Flags and States:** Employed loading flags and states to prevent unnecessary form submissions while processing requests.

## Technologies Used
- Frontend: ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- Backend: ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
- Deployment: ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) (Frontend), ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white) (Backend)
- Containerization: ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
- Orchestration: ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
- Database: ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Project Structure
The project is structured into frontend and backend components, with each having its own directory. The frontend is built using React and Vite, while the backend is implemented in Flask with a PostgreSQL database. Both components are containerized using Docker, and Docker Compose is utilized for orchestration.

## Frontend
### Overview

The frontend serves as a user interface, allowing individuals to seamlessly enroll in yoga classes, log in, change their yoga batch for the next month, and make payments for the current month. It interacts with the backend through APIs, utilizing the provided endpoints to execute these functions. The intuitive design ensures a user-friendly experience for managing class preferences and payments.

### Technologies
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
### Visual Web Design
![User Flow](./Docs/images/visual_user_flow.png)

### Installation for frontend

To run the frontend locally, follow these steps:

1. Create an `.env` file in the `frontend` directory.

    ```env
    # .env
    VITE_API_BASE_URL="http://localhost:5000"
    ```

2. Run the following command:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

Now, the frontend will be accessible at [http://localhost:5173](http://localhost:5173).

## Backend
### Overview

The backend serves as the API server for the Flex Yoga Class Admission Portal. It handles API calls initiated from the frontend, managing the application's database. Built using Flask, the backend provides a RESTful API, and the database is powered by PostgreSQL. Object-Relational Mapping (ORM) is employed to interact seamlessly with the PostgreSQL database, ensuring efficient data management and retrieval.

### Technologies
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

### Database Design

#### Entity Relationship (ER) Diagram

![ER Diagram](./Docs/images/ER_Diagram.svg)

#### Tables

##### User Table

- **username**: primary key, varchar(50)
- **password**: text
- **name**: text
- **age**: int, CheckConstraint('age >= 18 AND age <= 65')
- **contact**: varchar(20)
- **joined_date**: timestamp, Default: current timestamp
- **is_active**: boolean, Default: True

##### Batches Table

- **batch_id**: primary key, int
- **batch**: varchar(50)

##### BatchChangeRequest Table

- **id**: primary key, int
- **username**: foreign key (User), varchar(50)
- **requested_time**: timestamp, Default: current timestamp + 1 month
- **batch_id**: foreign key (Batches), int

##### PaymentHistory Table

- **id**: primary key, int
- **username**: foreign key (User), varchar(50)
- **time_of_payment**: timestamp, Default: current timestamp
- **amount**: int, Default: 500

#### Relationships

- **User -> BatchChangeRequest**: One-to-Many relationship on username
- **User -> PaymentHistory**: One-to-Many relationship on username
- **Batches -> BatchChangeRequest**: One-to-Many relationship on batch_id

#### Constraints

- **User -> age**: Check constraint to ensure age is between 18 and 65
- **BatchChangeRequest -> requested_time**: Default constraint to set requested_time to current timestamp + 1 month

### API Endpoints

#### 1. Home
- **Endpoint**: `/`
- **Method**: `GET`
- **Description**: Welcomes users to the Yoga Class App.

#### 2. Create User
- **Endpoint**: `/create_user`
- **Method**: `POST`
- **Description**: Creates a new user for the Yoga Class App and enrolls him to specified batch.
- **Request Body**:
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
- **Response**:
  - **Success**: Status Code 201
  ```json
  {
    "message": "User created successfully"
  }
  ```
  - **Error**: Status Code 400 or 500
  ```json
  {
    "error": "Error message"
  }
  ```

#### 3. Login
- **Endpoint**: `/login`
- **Method**: `POST`
- **Description**: Validates user credentials for login.
- **Request Body**:
  ```json
  {
    "username": "example_username",
    "password": "example_password"
  }
  ```
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "message": "Login successful"
  }
  ```
  - **Error**: Status Code 401
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

#### 4. Batch Change Request
- **Endpoint**: `/batch-change`
- **Method**: `POST`
- **Description**: Initiates a request to change the user's yoga batch for the next month.
- **Request Body**:
  ```json
  {
    "username": "example_username",
    "new_batch_id": 2
  }
  ```
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "message": "Request Processed Successfully"
  }
  ```
  - **Error**: Status Code 500
  ```json
  {
    "error": "Error message"
  }
  ```

#### 5. Get Current Batch
- **Endpoint**: `/get-current-batch`
- **Method**: `GET`
- **Description**: Retrieves the user's current yoga batch.
- **Query Parameters**:
  - `username` (string): User's username
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "current_batch": 1,
    "batch": "6-7AM"
  }
  ```
  - **Error**: Status Code 404
  ```json
  {
    "error": "No records found for username: example_username"
  }
  ```

#### 6. Complete Payment
- **Endpoint**: `/complete-payment`
- **Method**: `POST`
- **Description**: Records the completion of a payment for the user, this is dummy function handling payment.
- **Request Body**:
  ```json
  {
    "username": "example_username",
    "amount": 500
  }
  ```
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "message": "Payment Processed Successfully"
  }
  ```
  - **Error**: Status Code 500
  ```json
  {
    "error": "Error message"
  }
  ```

#### 7. Get Payment Status
- **Endpoint**: `/get-payment-status`
- **Method**: `GET`
- **Description**: Retrieves the payment status for the user, i.e. fee dues till the current month.
- **Query Parameters**:
  - `username` (string): User's username
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "due_status": true,
    "amount": 500
  }
  ```
  - **Error**: Status Code 404
  ```json
  {
    "error": "No records found for username: example_username"
  }
  ```

#### 8. Get Active Status
- **Endpoint**: `/get-active-status`
- **Method**: `GET`
- **Description**: Retrieves the active status for the user i.e. active user has no fee dues except current month.
- **Query Parameters**:
  - `username` (string): User's username
- **Response**:
  - **Success**: Status Code 200
  ```json
  {
    "is_active": true
  }
  ```
  - **Error**: Status Code 500
  ```json
  {
    "error": "Error message"
  }
  ```
### Installation for backend

To run the backend locally, follow these steps:

1. Create an `.env` file in the `backend` directory.

    ```env
    # .env
    DATABASE_URL="postgresql://user:password@localhost:5432/yoga_class"
    ```

    Replace `user` and `password` with your PostgreSQL credentials.

2. Run the following commands:

    ```bash
    pip install -r requirements.txt
    ```

3. Start the backend server:

    ```bash
    python flex-yoga-app.wsgi
    ```

Now, the backend will be accessible at [http://localhost:5000](http://localhost:5000).

Note: Ensure that you have a PostgreSQL server running locally with the specified credentials.

## Containerization

### Docker Compose

Docker Compose is used to orchestrate the deployment of both frontend and backend components. Ensure you have Docker and Docker Compose installed on your system.

#### Configuration

Create an `.env` file in the root directory and include the following environment variables:

```env
# .env
DATABASE_URL=""
VITE_API_BASE_URL=""
```

#### Building and Running

Use the following commands to build and run the Docker containers:

```bash
# Build and run containers
docker-compose up --build

# To run in detached mode
docker-compose up --build -d
```

### Individual Containers

If you prefer to build and run containers individually, you can use the following commands:

#### Backend

```bash
# Build backend container
docker build -t backend ./backend

# Run backend container
docker run -p 5000:5000 --env-file .env backend
```

#### Frontend

```bash
# Build frontend container
docker build -t frontend ./frontend

# Run frontend container
docker run -p 5173:5173 --env-file .env frontend
```

##### Note

- Ensure that the `.env` file is present and contains the required environment variables before building the containers.
- For the frontend, VITE_API_BASE_URL is a runtime environment variable and should be included in the `.env` file.

## Live Links

- Frontend: [Flex Yoga Admission Portal](https://flex-yoga-admission-portal.netlify.app/)
- Backend: [Flex Yoga App API](https://flex-yoga-app.onrender.com/)

**Note**: There might be an issue with the initial request when from frontend. If you encounter any problems, please try making multiple requests, and it should work smoothly.

## Demo GIFs

Below are visual demonstrations of key functionalities within the Flex Yoga Admission Portal.
###  Creating a User

![Create User](./Docs/gifs/CreatingUser.gif)

### Logging In, Paying Dues, Making batch change request, persisting user data on reload

![Login](./Docs/gifs/UserLogin.gif)

## Contributor

[NILDARK](https://github.com/NILDARK)
    - Email: [nilaykumarpatel86@gmail.com](nilaykumarpatel86@gmail.com), [nilu.patel2002@gmail.com](nilu.patel2002@gmail.com)