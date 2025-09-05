"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import EditTaskForm from "@/components/EditTaskForm";

export default function EditTaskPage() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the task by ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/api/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        console.error("Error fetching task:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTask();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading task...</p>;
  }

  if (!task) {
    return <p className="p-6 text-red-500">Task not found</p>;
  }

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
      <EditTaskForm task={task} onSuccess={() => router.push("/tasks")} />
    </div>
  );
}
