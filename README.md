# 📚 Library Management System <sub>beta</sub>

A modern, full-stack Library Management System built with **Django REST Framework** and **React (Vite)**. Designed with a premium aesthetic and robust backend architecture to handle cataloging, members, and book borrowing operations.

![Project Preview](https://via.placeholder.com/800x400?text=Library+Management+System+Preview)

## 🚀 Features

- **Advanced Cataloging**: Manage Books, Authors, and Categories with ease.
- **Smart Search**: Real-time filtering by title, description, ISBN, or category.
- **Borrowing System**: Full-flow borrowing and returning with real-time stock updates.
- **User Roles**: Separate interfaces for **Librarians** (Admin Console) and **Members**.
- **Admin Dashboard**: Comprehensive stats and control panels for library management.
- **Auth Flow**: Secure registration and profile management.
- **Premium UI**: Vibrant, responsive design using modern CSS best practices.

## 🛠️ Tech Stack

### Backend
- **Framework**: Django 6.0+
- **API**: Django REST Framework (DRF)
- **Database**: SQLite3 (Local development)
- **Middleware**: CORS-Headers for secure frontend communication

### Frontend
- **Framework**: React 18+ (Vite)
- **Routing**: React Router Dom v6
- **API Client**: Axios
- **Styling**: Custom Vanilla CSS (Premium Design tokens)

## 📦 Installation & Setup

### 1. Prerequisites
- Python 3.10+
- Node.js & npm

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Create & Activate Virtual Environment
python -m venv venv
.\venv\Scripts\Activate.ps1  # Windows

# Install Dependencies
pip install django djangorestframework django-cors-headers

# Run Migrations
python manage.py migrate

# Seed Initial Data (Optional)
python manage.py seed_data

# Create Superuser (For /admin access)
python manage.py createsuperuser

# Start Server
python manage.py runserver
```

### 3. Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install Dependencies
npm install

# Start Development Server
npm run dev
```

## 📂 Project Structure

```text
Project-Library-Management-System/
├── backend/            # Django Project Config & API App
│   ├── api/            # Core API logic (Models, Views, Serializers)
│   ├── lms_backend/    # Django Settings & Master URLs
│   └── manage.py
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # Reusable UI pieces
│   │   ├── pages/      # Full-page views (Dashboard, Login, etc.)
│   │   ├── styles/     # Global and component-level CSS
│   │   └── api.js      # Centralized API service
│   └── package.json
└── README.md
```

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---
Built with ❤️ for the love of books and code.
