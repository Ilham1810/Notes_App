# 📝 Fullstack Notes App

A modern fullstack notes application built with **React + Laravel API**.

✨ Clean UI, authentication, dark mode, and real-time search.

---

## 🚀 Features

- 🔐 Authentication (Login & Register)
- 📝 CRUD Notes (Create, Read, Update, Delete)
- 🌙 Dark Mode (Auto detect + toggle)
- 🔍 Search Notes
- 🎨 Modern UI (Tailwind CSS)

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React
- 🎨 Tailwind CSS
- 🔔 React Hot Toast
- 🌐 Axios

### Backend
- 🐘 Laravel
- 🔐 Laravel Sanctum
- 🗄️ MySQL

---

## 📸 Preview

### 📝 Notes Page
![Notes](screenshots/notes.png)

### 🔐 Login Page
![Login](screenshots/login.png)

### 🆕 Register Page
![Register](screenshots/register.png)

---

## 📂 Project Structure
notes-app/
├── notes-client/ # React frontend
├── notes-api/ # Laravel backend
├── screenshots/
│ ├── notes.png
│ ├── login.png
│ ├── register.png
└── README.md

---

## ⚙️ Installation

### 🔧 Backend (Laravel) And Frontend (React)

```bash
cd notes-api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

cd notes-client
npm install
npm start