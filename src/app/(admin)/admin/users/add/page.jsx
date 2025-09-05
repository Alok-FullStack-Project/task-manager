"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddUserPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    status: "active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/users", form);
      router.push("/admin/users");
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Add User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add User
        </button>
      </form>
    </div>
  );
}
