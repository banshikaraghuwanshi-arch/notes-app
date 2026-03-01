📝 Notes App (Full Stack – MERN)

A Full Stack Notes Application built using MongoDB, Express.js, React (Vite), and Node.js.
This project was developed during my Web Development Internship to demonstrate REST API creation, MongoDB schema design, and frontend-backend integration.

🚀 Features

✍️ Create notes (Title + Content)

📌 Pin / Unpin important notes

🗑️ Delete notes

🔄 Real-time UI updates

🌐 RESTful API integration

📦 MongoDB database storage

🛠️ Tech Stack
🔹 Frontend

React

Vite

🔹 Backend

Node.js

Express.js

MongoDB

Mongoose

📂 Project Structure
notes-app/
│
├── notes-frontend/      → React Frontend
│
├── models/              → MongoDB Schemas
├── routes/              → API Routes
├── server.js            → Express Server
├── package.json
└── README.md
⚙️ Installation Guide
1️⃣ Clone Repository
git clone <your-repo-link>
cd notes-app
🔹 Backend Setup (Root Folder)

Install backend dependencies:

npm install

Create .env file in root:

PORT=5000
MONGO_URI=your_mongodb_connection_string

Run backend:

npm run dev

Backend runs on:

http://localhost:5000
🔹 Frontend Setup

Open new terminal:

cd notes-frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🔗 API Endpoints
Method	Route	Description
GET	/api/notes	Get all notes
POST	/api/notes	Create note
PUT	/api/notes/:id	Update note
DELETE	/api/notes/:id	Delete note
🎯 Learning Outcomes

REST API development

MongoDB schema design

CORS configuration

Full-stack integration

Git & GitHub workflow

👩‍💻 Developed By

Banshika Raghuwanshi
B.Tech Computer Science (2nd Year)
Web Development Intern
