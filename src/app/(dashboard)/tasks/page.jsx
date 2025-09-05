"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "@/components/TaskList";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(""); // 👈 status filter

  // Fetch tasks with search + status
  const fetchTasks = async (query = "", statusFilter = "") => {
    try {
      const res = await axios.get(
        `/api/tasks?search=${query}&status=${statusFilter}`
      );
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTasks(search, status);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6">All Tasks</h1>

      {/* Search + Status Filter */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-lg"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <TaskList tasks={tasks} loading={loading} refreshTasks={fetchTasks} />
    </div>
  );
}
