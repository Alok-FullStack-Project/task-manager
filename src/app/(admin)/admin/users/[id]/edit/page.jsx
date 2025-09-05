"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/admin/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/admin/users/${id}`, user);
       toast.success("Updated successfully.");
      router.push("/admin/users");
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
          className="w-full border rounded p-2"
        />
        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <select
          name="status"
          value={user.status}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Update User
        </button>
      </form>
    </div>
  );
}
