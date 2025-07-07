🏫 VINSYS Training Room Booking System
Group 4 Project
Team Members: 22, 6, 24, 9, 10, 23

📌 Overview
The VINSYS Training Room Booking System is a full-stack web application designed to simplify the process of booking training rooms and resources. It offers secure user authentication, real-time calendar views, admin approval, OTP verification, and automated email confirmations — all hosted using modern cloud technologies.

🚀 Features
✅ User Authentication – Secure login/signup with JWT-based auth.

📝 Booking Form – Select room, date, and time with validations.

🗓️ Booking Calendar – Visual calendar view of existing and upcoming bookings.

🔐 OTP Verification – Verifies user identity before finalizing a booking.

🛠️ Admin Dashboard – Admins can view, approve, or reject bookings.

📧 Email Notifications – Automatic booking confirmation via email.

☁️ Cloud Architecture (AWS + MongoDB)
This project is fully deployed in the cloud using a combination of AWS services and MongoDB Atlas:

Amazon S3

Hosts the static React frontend

Stores training-related assets

Amazon EC2

Hosts the Node.js + Express backend on a t3.medium instance

MongoDB Atlas

Cloud-hosted database for storing users, rooms, and booking data

Amazon SNS (Simple Notification Service)

Sends automated email confirmations after bookings are approved

🎯 Deliverables
✅ Fully functional booking system accessible online (frontend hosted on S3)

✅ Admin dashboard with full control over booking approvals

✅ Integration with OTP and email notification system

✅ At least 5 demo bookings with complete confirmation workflow

✅ All services deployed using AWS and MongoDB Atlas

✅ Success Criteria
Users can register, log in, and book available rooms.

OTP is required for final booking submission.

Admins can view and approve/reject bookings via the dashboard.

Email confirmations are triggered using AWS SNS (5 confirmations minimum).

All features integrated and live on the cloud infrastructure.

🛠️ Tech Stack
Frontend: React.js (hosted on S3)

Backend: Node.js + Express (hosted on EC2)

Database: MongoDB Atlas (cloud-hosted NoSQL)

Notifications: AWS SNS

Authentication: JWT with OTP verification