# damp-bite-3145

Damp Bite 3145 is a pill reminder app designed to help users manage their medication schedule effectively. It provides a user-friendly interface to set up personalized reminders for taking medications and never miss a dose. The app consists of three main components: the Homepage, Login page, and Reminder page. Additionally, it includes an API for user management.

Components
1. Homepage
The homepage component provides a warm welcome to users and highlights the main features of the app.

2. Login Page
The login page component handles user authentication, allowing existing users to log in and new users to register.

3. Reminder Page
The reminder page component enables users to set and manage their medicine reminders, providing a user-friendly interface for scheduling and editing reminders.

API for User Management
The app also includes an API to manage user data.

API Base URL: https://api-server-mejj.onrender.com

Endpoints

GET /users

Fetches the list of users.

POST /users

Registers a new user.

DELETE /users/:id

Deletes a user with the specified ID.

GET /alarms?userid=:id

Fetches the list of reminders for the user with the specified ID.

POST /alarms

Creates a new reminder for a user.

DELETE /alarms/:id

Deletes a reminder with the specified ID.