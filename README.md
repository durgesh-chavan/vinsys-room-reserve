# 🏢 VINSYS Training Room Booking System

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![AWS](https://img.shields.io/badge/AWS-EC2%2BS3%2BSNS-orange)
![MongoDB](https://img.shields.io/badge/database-MongoDB_Atlas-green)

> A cloud-based solution for efficient training room management and resource allocation

## 🌟 Features

### Core Functionality
- **Secure Authentication** (JWT + OTP verification)
- **Intuitive Booking Interface** with form validations
- **Admin Approval Workflow** with dashboard
- **Real-time Calendar View** of room availability

### Technical Highlights
- **Cloud Native Architecture** (AWS hosted)
- **Automated Email/SMS Notifications**
- **Responsive React Frontend**
- **Scalable Node.js Backend**

## 🖥️ Screenshots

| Login Screen | Booking Calendar | Admin Dashboard |
|--------------|------------------|-----------------|
| ![Login](https://via.placeholder.com/300x200?text=Login+Screen) | ![Calendar](https://via.placeholder.com/300x200?text=Booking+Calendar) | ![Admin](https://via.placeholder.com/300x200?text=Admin+Dashboard) |

## 🛠️ Tech Stack

**Frontend**:
- React.js
- Material-UI
- FullCalendar.js

**Backend**:
- Node.js
- Express.js
- Mongoose ODM

**Infrastructure**:
- AWS EC2 (Backend)
- AWS S3 (Frontend)
- MongoDB Atlas (Database)
- AWS SNS (Notifications)

## 🚀 Deployment Architecture

```mermaid
graph TD
    A[React Frontend] -->|Hosted on| B[AWS S3]
    C[Node.js Backend] -->|Hosted on| D[AWS EC2]
    E[MongoDB Atlas] -->|Database| C
    C -->|Sends| F[AWS SNS]
    F -->|Notifications| G[Email/SMS]
````
⚙️ Installation
Prerequisites
Node.js v16+

MongoDB Atlas account

AWS account (for deployment)

Local Development Setup
# Clone repository
git clone https://github.com/your-repo/vinsys-booking.git
cd vinsys-booking

# Install backend dependencies
cd backend
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Start backend server
npm run dev

# In another terminal - frontend setup
cd ../frontend
npm install
npm start


vinsys-booking/
├── backend/           # Node.js server
│   ├── controllers/  # Route controllers
│   ├── models/       # MongoDB models
│   ├── routes/       # API endpoints
│   └── app.js        # Main server file
├── frontend/         # React application
│   ├── public/       # Static assets
│   ├── src/          # React components
│   └── ...           # React config files
├── docs/             # Documentation
└── README.md         # Project overview
