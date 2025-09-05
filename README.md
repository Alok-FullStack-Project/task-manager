Got it 👍 I’ll create a clean **`README.md`** for your Task Manager app (with admin panel, NextAuth authentication, MongoDB, etc.).

Here’s a good starting version 👇

---

# 📝 Task Manager App

A full-stack **Task Manager application** built with **Next.js 15, NextAuth, MongoDB, and TailwindCSS**.
Includes **user authentication**, **task management**, and a full **Admin Panel** for managing users and tasks.

---

## 🚀 Features

### 👤 User

* Register and login with secure authentication (NextAuth + JWT).
* Manage profile (name, email, profile image).
* Create, update, and delete tasks.
* View task statuses (`pending`, `in-progress`, `completed`).
* Protected routes (users must log in to access dashboard).

### 🛠️ Admin

* Admin-only dashboard with statistics:

  * Total users
  * Active / Inactive users
  * Task counts by status
* User management (view, edit, delete, activate/deactivate users).
* Task management (view, edit, delete tasks, with user details populated).
* Middleware-based route protection (non-admins cannot access `/admin`).

---

## 🏗️ Tech Stack

* **Next.js 15 (App Router)**
* **React 18**
* **NextAuth v5**
* **MongoDB & Mongoose**
* **TailwindCSS**
* **React Hot Toast** (notifications)
* **Axios** (API calls)

---

## 📂 Project Structure

```
src/
 ├── app/
 │   ├── (public)/        # Public pages (login, register, etc.)
 │   ├── (protected)/     # Authenticated user pages
 │   ├── (admin)/         # Admin panel
 │   ├── api/             # API routes (Next.js server actions)
 │   ├── layout.js        # Root layout with Providers
 │   └── globals.css
 ├── components/          # Shared components
 │   ├── Providers.jsx    # NextAuth Session provider
 │   ├── Sidebar.jsx      # User sidebar
 │   ├── AdminSidebar.jsx # Admin sidebar
 │   ├── TaskList.jsx     # Task rendering
 │   └── ...
 ├── models/              # Mongoose models (User.js, Task.js)
 ├── lib/                 # DB connection, utils, authOptions
 └── middleware.js        # Middleware protection
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager
```

---

## ▶️ Getting Started

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup `.env.local` (see above).

4. Run the dev server:

   ```bash
   npm run dev
   ```

5. Visit:

   ```
   http://localhost:3000
   ```

---

## 🔐 Roles

* **User** → Can manage only their own tasks. Redirected to `/dashboard` after login.
* **Admin** → Can manage all users and tasks. Redirected to `/admin` after login.

---

## 📊 Future Improvements

* Add pagination and filtering for tasks and users.
* Add charts to admin dashboard.
* Add password reset functionality.
* Implement file upload for profile images.

---

## 🧑‍💻 Author

Built by **Alok Kumar** 🚀

---

👉 Do you want me to **add screenshots & API endpoint documentation** (for tasks/users CRUD) in the README as well?
