# Todo List Application
This is a Todo List application built with Express.js, TypeScript, and MongoDB.The application allows users to manage their tasks through a RESTful API, with support for creating, reading, updating, and deleting tasks.

## Features
 - The application implements OAuth for secure authentication using third-party services (Google), and token-based authentication for session management.
 - Request validation is implemented using Joi to ensure data integrity and security.
 - RESTful API design

## Technologies Used

1. Express.js
2. TypeScript
3. MongoDB
4. OAuth
5. JWT (JSON Web Token)

## Project Setup Instructions
### Prerequisites
- Node.js and npm installed on your machine.
- MongoDB Atlas (Cloud) configured

### Installation
```bash
## Clone the repository
git clone https://github.com/Tetiankaa/todo_list_express.git
cd todo_list_express

## Install dependencies
npm install

## Create a .env file in the root directory and populate it with your configuration. 
## You can use the `.env.example` file as a reference.
## Ensure that you provide the correct MongoDB URI for your cloud MongoDB server.

## Start the Development Server
npm run dev

```
