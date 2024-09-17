Personal Blog App - Backend
This is the backend for the Personal Blog App. It provides CRUD (Create, Read, Update, Delete) operations for blog posts using Node.js, Express.js, and MongoDB (Mongoose for schema definition).

Features
Create a new blog post (title, description, author)
View all blog posts
Edit an existing blog post (title, description, author)
Delete a blog post
Technologies Used
Node.js: JavaScript runtime for building the backend.
Express.js: Web framework to handle routes and middleware.
MongoDB: NoSQL database for storing blog posts.
Mongoose: ORM for MongoDB, used to define the schema and interact with the database.
Cors: Middleware to enable Cross-Origin Resource Sharing.
dotenv: For managing environment variables.
Requirements
To run this project locally, ensure you have the following installed:

Node.js (v12+): Install Node.js
MongoDB: Install MongoDB locally or use a MongoDB cloud service like MongoDB Atlas.
Installation
Clone the repository to your local machine.
Steps Overview:
Clone the repository: git clone <repo-url>.
Install dependencies: npm install.
Create .env: Add your MongoDB connection string.
Start MongoDB: Ensure MongoDB is running (if local).
Run server: node index.js or nodemon (if nodemon installed).
