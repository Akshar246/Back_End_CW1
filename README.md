# Tutoring App Backend

* This repository hosts the backend for the Tutoring App, designed to support and manage the online tutoring platform's operations. The backend handles all data interactions, API services, and static content delivery, ensuring a responsive and scalable service for the front-end application.

  ## Live Application

The backend is currently hosted live at Render for testing and production usage. Access the live backend here:

https://tutoring-app-ky9w.onrender.com

This live version allows you to interact with the API endpoints directly and is useful for frontend applications that require a real server environment.


### Features

* API Endpoints: Manage courses, bookings, and user interactions through RESTful endpoints.
* Static Content: Serves images and HTML content directly related to the tutoring services.
* Database Connectivity: Manages connections to MongoDB, leveraging configuration settings for robust data handling.
* Search Functionality: Offers advanced search capabilities across different lesson parameters.

### Technologies Used

* Node.js: Server-side JavaScript runtime.
* Express.js: Web application framework for Node.js.
* MongoDB: Document-oriented NoSQL database used for storing application data.
* Mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.

## Setup Instructions

### Installation
1. Clone the Repository:
- git clone https://github.com/Akshar246/Back-End_CW1.git
- cd Back-End_CW1

2. Install Dependencies:
- npm install

3. Run the Server
- nodemon run app.js

## API Documentation
* Refer to routes directory for details on API endpoints provided by this backend. This includes:

1. lessonRoutes.js: Endpoints for managing lesson data.
2. orderRoutes.js: Endpoints for processing orders.
3. searchRoutes.js: Endpoints to perform search operations.

### License: 
* This project is licensed under the MIT License - see the LICENSE file for details.
