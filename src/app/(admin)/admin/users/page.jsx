"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`/api/admin/users/${id}`);
      setUsers(users.filter((u) => u._id !== id)); // update UI
    } catch (err) {
      console.error("Error deleting user:", err);
      alert(err.response?.data?.error || "Failed to delete user");
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
       <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Link
          href="/admin/users/add"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add User
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 space-x-2">
  {/* Edit goes to a page */}
  <Link
    href={`/admin/users/${user._id}/edit`}
    className="text-blue-600 hover:underline"
  >
    Edit
  </Link>

  {/* Delete stays a button since it calls API */}
  <button
    onClick={() => handleDelete(user._id)}
    className="text-red-600 hover:underline"
  >
    Delete
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
