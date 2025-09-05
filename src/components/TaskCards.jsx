export default function TaskCards({ tasks, loading }) {
  if (loading) return <p className="text-gray-600">Loading tasks...</p>;

  const pendingCount = tasks.filter((t) => t.status === "pending").length;
  const inProgressCount = tasks.filter((t) => t.status === "in-progress").length;
  const completedCount = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-2">Pending Tasks</h2>
        <p className="text-gray-600 text-sm">{pendingCount} tasks</p>
      </div>
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-2">In Progress</h2>
        <p className="text-gray-600 text-sm">{inProgressCount} tasks</p>
      </div>
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-2">Completed</h2>
        <p className="text-gray-600 text-sm">{completedCount} tasks 🎉</p>
      </div>
    </div>
  );
}
