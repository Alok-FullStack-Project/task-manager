import Link from "next/link";

export default function RecentTasks({ tasks }) {
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (recentTasks.length === 0) {
    return (
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>
        <p className="text-gray-500">No tasks available</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>
      <ul className="divide-y divide-gray-200">
        {recentTasks.map((task) => (
          <li key={task._id} className="py-3 flex justify-between items-center">
            <Link
              href={`/tasks/${task._id}`}
              className="font-medium text-blue-600 hover:underline"
            >
              {task.title}
            </Link>
            <span className="text-sm text-gray-500">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No due date"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
