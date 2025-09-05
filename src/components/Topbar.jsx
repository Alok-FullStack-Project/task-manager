export default function Topbar({ user }) {
  return (
    <header className="flex justify-between items-center bg-white shadow p-4">
      <h1 className="text-xl font-bold">Welcome, {user?.name}</h1>
      <div className="flex items-center space-x-3">
        <span className="text-gray-600">{user?.email}</span>
        <img
          src={user?.profileImage || "/default-avatar.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
}
