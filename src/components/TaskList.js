"use client";
import TaskRow from "./TaskRow";

export default function TaskList({ tasks, loading, refreshTasks }) {
  if (loading) {
    return <p className="text-center text-gray-500">Loading tasks...</p>;
  }

  if (!tasks || tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks found.</p>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Creation Date</th>
            <th className="px-4 py-2 text-left">Due Date</th>
            <th className="px-4 py-2 text-left">Completion Date</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskRow key={task._id} task={task} refreshTasks={refreshTasks} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
