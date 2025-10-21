# MERN Stack Blog — Complete Project Documentation

A full‑stack MERN (MongoDB, Express, React, Node) blog application that demonstrates clean client–server integration, authentication, validation, image uploads, pagination/search, and a Vite-based React frontend.

This README covers the entire project contained under the mern-blog directory, including both the server (API) and the client (frontend UI).


## Table of Contents
- Overview
- Tech Stack
- Repository Layout
- Getting Started
  - Prerequisites
  - Setup
  - Environment Variables
  - Running in Development
  - Building for Production (client)
- API Documentation
  - Auth
  - Posts
  - Categories
  - Uploads
- Features
- Troubleshooting & Tips
- Scripts
- Contributing
- License


## Overview
The project implements a minimal yet complete blog platform:
- Server: Express API with endpoints for posts, categories, and authentication, plus an image upload endpoint.
- Client: React (Vite) frontend that consumes the API and renders a blog UI.
- Database: MongoDB stores users, posts, and categories.


## Tech Stack
- Frontend: React 18, React Router, Vite
- Backend: Node.js, Express, Mongoose, Joi, Multer, JWT, CORS, Morgan
- Database: MongoDB


## Repository Layout
```
mern-blog/
├─ client/                 # React app (Vite)
│  ├─ src/
│  │  ├─ api/
│  │  ├─ components/
│  │  ├─ context/
│  │  ├─ hooks/
│  │  ├─ pages/
│  │  └─ router/
│  ├─ index.html
│  ├─ package.json
│  └─ .env.example
│
├─ server/                 # Express API server
│  ├─ src/
│  │  ├─ app.js            # app setup, middleware, routers
│  │  ├─ index.js          # server entry (loads env, starts app)
│  │  ├─ config/db.js      # db connection
│  │  ├─ controllers/      # business logic
│  │  ├─ middleware/       # error handler, validate, auth, upload
│  │  ├─ models/           # Mongoose models: User, Post, Category
│  │  ├─ routes/           # auth, posts, categories, schemas
│  │  └─ utils/            # asyncHandler, jwt, pagination, upload
│  ├─ package.json
│  └─ .env.example
│
└─ README.md               # This file (project-wide documentation)
```

Note: If you are browsing the repository root, there may also be utility scripts under ../scripts (relative to this file), such as bootstrap and push-ssh. Use them from the repo root if present.


## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB running locally or a MongoDB URI

### Setup
1. Install server dependencies
   - cd mern-blog/server
   - npm install (or npm ci if you have a lockfile)
2. Install client dependencies
   - cd mern-blog/client
   - npm install (or npm ci)

Alternatively, if the repository root contains a helper script (../scripts/bootstrap.sh), from the repo root run:
- bash scripts/bootstrap.sh

### Environment Variables
Create .env files based on the examples.

Server (mern-blog/server/.env example):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern_blog
JWT_SECRET=replace-with-strong-secret
CORS_ORIGIN=http://localhost:5173
UPLOAD_DIR=uploads
```

Client (mern-blog/client/.env example):
```
VITE_API_BASE=http://localhost:5000/api
```

Notes:
- The server will serve files from UPLOAD_DIR at /uploads.
- If PORT is in use, the server attempts the next port or a random open port. Adjust VITE_API_BASE accordingly.

### Running in Development
Start the API server:
- cd mern-blog/server
- npm run dev

Start the React app:
- cd mern-blog/client
- npm run dev

Open the client URL printed by Vite (typically http://localhost:5173).

### Building for Production (client)
- cd mern-blog/client
- npm run build
- npm run preview  # optional local preview of the built client


## API Documentation
Base URL: http://localhost:5000/api (or whatever the server starts on)

Common
- Content-Type: application/json unless uploading files.
- Validation errors: 400 with Joi details.
- Not found: 404.
- Auth endpoints return a JWT in { token }. Include it as Authorization: Bearer <token> for protected routes (if/when added).

### Auth
Base: /api/auth

POST /register
- Body: { email: string(email), password: string(min 8) }
- 201: { token }
- 400: Email already in use

POST /login
- Body: { email: string(email), password: string(min 8) }
- 200: { token }
- 401: Invalid credentials

### Posts
Base: /api/posts

GET /
- Query:
  - page? number (default 1)
  - limit? number (default 10)
  - q? string (search title/content; case-insensitive)
  - category? string (Category _id)
- 200: { items: Post[], total: number, page: number, pages: number }

GET /:id
- 200: Post
- 404: Not found

POST /
- Body (Joi):
  - title: string(3..120) required
  - slug: string matching ^[a-z0-9-]+$ required
  - content: string(min 10) required
  - categories: string[] of 24-char hex IDs (default [])
  - featuredImage: string (optional)
- 201: Post
- 400: Validation errors

PUT /:id
- Body: same fields as POST but all optional
- 200: Updated Post
- 404: Not found

DELETE /:id
- 204 No Content
- 404: Not found

POST /upload
- Form-data: image: file
- 201: { filename: string, url: "/uploads/<filename>" }

### Categories
Base: /api/categories

GET /
- 200: Category[] (sorted by name asc)

POST /
- Body (Joi):
  - name: string(2..60) required
  - slug: string matching ^[a-z0-9-]+$ required
- 201: Category
- 400: Validation errors


## Features
- RESTful API with Express
- Data models: Post, Category, User (for auth)
- Validation with Joi
- Centralized error handling
- Auth: register and login issuing JWT
- Image uploads with Multer, served from /uploads
- Pagination, search, and category filtering for posts
- React front-end with Vite and React Router


## Troubleshooting & Tips
- MongoDB connection: verify MONGODB_URI if not running locally.
- CORS: ensure CORS_ORIGIN matches your client dev URL (e.g., http://localhost:5173).
- Ports: If 5000 is taken, the server will move to another port and log it; update VITE_API_BASE accordingly.
- File uploads: ensure UPLOAD_DIR exists or the app has permissions to create it.


## Scripts
If present at the repository root (outside this folder):
- scripts/bootstrap.sh — Install dependencies for both client and server.
- scripts/push-ssh.sh — Configure SSH remote and push your current branch.

Usage from repo root:
- bash scripts/bootstrap.sh
- bash scripts/push-ssh.sh

Manual alternatives:
- cd mern-blog/server && npm ci
- cd mern-blog/client && npm ci
- git remote add origin git@github.com:YOUR/REPO.git
- git push -u origin <branch>


## Contributing
- Fork the repo and create a feature branch.
- Commit changes with clear messages.
- Open a pull request describing your changes and testing steps.

## License
This project is provided for learning purposes. Add a LICENSE file if you plan to distribute under a specific license.
