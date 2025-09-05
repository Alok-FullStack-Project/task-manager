"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const res = await axios.get(`/api/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        setError("Failed to load task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;
  if (!task) return <p className="text-center mt-6">Task not found</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6 mt-6">
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      <p className="text-gray-700 mb-4">{task.description || "No description"}</p>
      <p>
        <span className="font-semibold">Status:</span>{" "}
        <span
          className={`${
            task.status === "completed"
              ? "text-green-600"
              : task.status === "in-progress"
              ? "text-yellow-600"
              : "text-gray-600"
          }`}
        >
          {task.status}
        </span>
      </p>
      <p className="mt-2">
        <span className="font-semibold">Due Date:</span>{" "}
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "Not set"}
      </p>
       {task.status === "completed" && (
  <p className="mt-2">
    <span className="font-semibold">Completion Date:</span>{" "}
    {task.completedAt
      ? new Date(task.completedAt).toLocaleDateString()
      : "Not set"}
  </p>
)}
    </div>
  );
}
