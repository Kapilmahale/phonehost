# 📱 PhoneHost - Smartphone Based Web Hosting Platform

## Overview

PhoneHost is a full-stack MERN application that transforms an Android smartphone into a lightweight web hosting server. Users can register, log in, upload ZIP files containing static websites, deploy them instantly, and manage their deployments through a dashboard.

The project demonstrates full-stack development, authentication, deployment automation, process management, networking, and smartphone-based hosting using Node.js, Express.js, React, MongoDB, Termux, PM2, and Cloudflare Tunnel.

---

<img width="887" height="440" alt="image" src="https://github.com/user-attachments/assets/1091aa46-091c-4aee-adb3-05869aaeb0cb" />


# Features

✅ User Registration & Login

✅ JWT Authentication

✅ Protected Routes

✅ Website Deployment via ZIP Upload

✅ Automatic ZIP Extraction

✅ Static Website Hosting

✅ User-specific Deployments

✅ Deployment Dashboard

✅ Delete Deployments

✅ Server Statistics Monitoring

✅ Android Smartphone as Hosting Server

✅ PM2 Process Management

✅ Cloudflare Tunnel Integration

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Vite

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs
* Multer
* ADM-ZIP

## Database

* MongoDB Atlas
* Mongoose

## Hosting & DevOps

* Termux
* PM2
* Cloudflare Tunnel
* Git & GitHub

---

# Project Architecture

User
↓
React Frontend
↓
Express Backend
↓
MongoDB Atlas
↓
Deployment Engine
↓
Android Smartphone Server
↓
Cloudflare Tunnel
↓
Internet

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd phonehost
```

---

# Backend Setup

```bash
cd server

npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

BASE_URL=http://localhost:5000
```

Start Backend:

```bash
npm start
```

---

# Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Production Build

Generate React production build:

```bash
cd client

npm run build
```

The build files will be generated inside:

```text
client/dist
```

Express serves these files in production.

---

# Running on Android (Termux)

Install required packages:

```bash
pkg update

pkg upgrade

pkg install git

pkg install nodejs

pkg install openssh
```

Clone project:

```bash
git clone <repository-url>

cd phonehost
```

Install dependencies:

```bash
cd server
npm install

cd ../client
npm install
```

Build frontend:

```bash
npm run build
```

Start server:

```bash
cd ../server

npm start
```

---

# PM2 Setup

Install PM2:

```bash
npm install -g pm2
```

Start backend:

```bash
pm2 start server.js --name phonehost
```

Useful Commands:

```bash
pm2 list

pm2 restart phonehost

pm2 logs

pm2 save
```

---

# Cloudflare Tunnel

Install:

```bash
pkg install cloudflared
```

Expose application to the internet:

```bash
cloudflared tunnel --url http://localhost:5000
```

Cloudflare generates a public URL:

```text
https://random-name.trycloudflare.com
```

---

# Deployment Workflow

1. User uploads ZIP file.
2. Multer stores uploaded file.
3. ADM-ZIP extracts website files.
4. Website folder is created.
5. URL is generated.
6. Deployment information is stored in MongoDB.
7. Website becomes accessible through generated URL.

---

# Folder Structure

```text
phonehost/

client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
├── dist/

server/
├── config/
├── middleware/
├── models/
├── routes/
├── uploads/
├── websites/
├── server.js
└── package.json
```

---

# Challenges Solved

* Linux Case Sensitivity Issues
* React Production Build Deployment
* Google OAuth Origin Restrictions
* Smartphone Server Configuration
* PM2 Background Process Management
* Public Internet Access using Cloudflare Tunnel
* ZIP Deployment Automation

---

# Learning Outcomes

This project provided hands-on experience with:

* Full Stack MERN Development
* Authentication & Authorization
* File Upload Handling
* ZIP Extraction Automation
* MongoDB Database Design
* Linux & Termux Environment
* Process Management with PM2
* Cloud Networking & Tunneling
* Smartphone-based Hosting Infrastructure
* Deployment Pipelines & DevOps Concepts

---

# Future Enhancements

* Google Authentication
* Deployment Logs
* Upload Progress Bar
* GitHub Repository Deployments
* Custom Domains
* Website Analytics
* Real-Time Monitoring
* Multi-user Hosting

---

# Author

Kapil Mahale

PhoneHost demonstrates how an Android smartphone can be transformed into a functional web hosting platform using modern full-stack technologies and lightweight DevOps tools.
