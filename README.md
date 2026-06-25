📚 BookFlow – Online Book Delivery Management System

📌 Project Overview

BiblioDrop is a full-stack online book delivery management system that connects readers with local libraries and independent book owners.
Users can browse books, request delivery, track orders, and leave reviews.
Librarians manage book listings and deliveries, while Admin oversees the entire platform.

This project demonstrates real-world full-stack concepts like role-based authentication, payment integration, dashboards, and analytics.

🚀 Key Features
👤 User (Reader)
    Browse and search books
    Request book delivery (Stripe payment integration)
    View delivery history
    Access personal reading list (Delivered books)
    Submit reviews (only after delivery)


📚 Librarian
    Add new books (with image upload via imgBB)
    Manage inventory (Edit / Delete books)
    Update delivery status (Pending → Dispatched → Delivered)
    Publish / Unpublish books


🛠️ Admin
    Approve or delete books
    Manage users (change roles / delete users)
    View all transactions
    Monitor platform analytics (charts & stats)


🧰 Tech Stack
Frontend
Next.js (App Router)
Tailwind CSS
Recharts / Chart.js
Better Auth
Backend
Node.js
Express.js
MongoDB (Atlas)
JWT Authentication (jose)
Other Tools
Stripe (Payment System)
imgBB API (Image Upload)
Vercel (Deployment)


🔐 Authentication System
Email & password login
Google OAuth (if enabled)
JWT-based secure APIs
Role-based access control:
User
Librarian
Admin


📊 Dashboard Features
User Dashboard
Reading statistics
Delivery history table
Reading list gallery
Reviews management
Librarian Dashboard
Book analytics
Earnings overview
Delivery management
Inventory control
Admin Dashboard
Total users, books, deliveries, revenue
Pie chart (books by category)
Book approval system
User management
Transaction monitoring