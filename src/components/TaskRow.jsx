"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TaskRow({ task, refreshTasks }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`/api/tasks/${task._id}`);
      refreshTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleEdit = () => {
    router.push(`/tasks/${task._id}/edit`);
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-2"><Link
              href={`/tasks/${task._id}`}
              className="font-medium text-blue-600 hover:underline"
            >{task.title}</Link></td>
      <td className="px-4 py-2 capitalize">{task.status}</td>
       <td className="px-4 py-2">
        {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "—"}
      </td>
       <td className="px-4 py-2">
        {task.dueDate ? new Date(task.createdAt).toLocaleDateString() : "—"}
      </td>
      <td className="px-4 py-2">
        {task.status === "completed" ? (
  <span>{task.completedAt ? new Date(task.completedAt).toLocaleDateString() : "—"}</span>
) : (
  <span>—</span>
)}
      </td>
      <td className="px-4 py-2 text-center space-x-2">
        <button
          onClick={handleEdit}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
