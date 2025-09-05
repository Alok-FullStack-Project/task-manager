"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get("/api/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold text-blue-600">{stats.usersCount}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Active Users</h2>
          <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Inactive Users</h2>
          <p className="text-2xl font-bold text-red-600">{stats.inactiveUsers}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Total Tasks</h2>
          <p className="text-2xl font-bold text-purple-600">{stats.tasksCount}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Completed Tasks</h2>
          <p className="text-2xl font-bold text-green-600">{stats.completedTasks}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Pending Tasks</h2>
          <p className="text-2xl font-bold text-yellow-600">{stats.pendingTasks}</p>
        </div>
      </div>
    </div>
  );
}
