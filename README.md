# MERN Stack CRUD Application

A full-stack MERN (MongoDB, Express, React, Node.js) application with CRUD functionality and clean UI using **Tailwind CSS** and **Flowbite**.

## 🚀 Features

- Add, Edit, Delete, and View Users
- Backend: Node.js, Express, MongoDB
- Frontend: React, Vite, Tailwind CSS, Flowbite
- SweetAlert2 for alerts
- Axios for API calls
- Toast notifications for feedback

## 🗂️ Folder Structure

MERN/
├── backend/ # Express + MongoDB API
├── frontend/ # React + Tailwind frontend
├── README.md
└── .gitignore

2. Setup Backend
cd backend
npm install
# create a .env file with your MongoDB URI
touch .env
# Inside .env
MONGODB_URI=mongodb://localhost:27017/your-db-name

npm run dev

3. Setup Frontend
cd ../frontend
npm install
npm run dev

API Endpoints
Method	Endpoint	Description
GET	/api/user/allUsers	Fetch all users
GET	/api/user/singleUser/:id	Get a single user
POST	/api/user/registerUser	Register a new user
PUT	/api/user/updateUser/:id	Update user
DELETE	/api/user/deleteUser/:id	Delete user

Technologies Used
Frontend: React, Vite, Tailwind CSS, Flowbite, Axios, Toastify
Backend: Node.js, Express.js, MongoDB, Mongoose
UI Enhancements: SweetAlert2
