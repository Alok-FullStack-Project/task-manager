"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch tasks (with optional status filter)
  const fetchTasks = async (status = "") => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/admin/tasks?status=${status}`);
      console.log(res.data);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      toast.error("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`/api/admin/tasks/${id}`);
      toast.success("Task deleted successfully!");
      fetchTasks(statusFilter);
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete task.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Tasks</h1>

      {/* Filter by status */}
      <div className="flex gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            fetchTasks(e.target.value);
          }}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Task Table */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin" size={32} />
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Title</th>
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Due Date</th>
                <th className="px-4 py-2 border">Completed At</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{task.title}</td>
                  <td className="px-4 py-2 border">{task.user?.email || "—"}</td>
                  <td className="px-4 py-2 border">{task.status}</td>
                  <td className="px-4 py-2 border">
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-2 border">
                    {task.completedAt
                      ? new Date(task.completedAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-2 border">
                    <Link
                  href={`/admin/tasks/${task._id}/edit`}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
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
