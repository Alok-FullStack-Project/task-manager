"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
      // ✅ Basic validation
  if (!form.name || !form.email || !form.password) {
    toast.error("All fields are required");
    return;
  }

  // ✅ Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  if (form.password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return;
  }
    try {
      await axios.post("/api/auth/register", form);
      toast.success("Registration successfull.");
      router.push("/login");
    } catch (err) {
      console.log(err.response.data.error)
      //setError(err.response.data?.data.error || "Something went wrong");
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          className="w-full border rounded p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded p-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded p-2"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
