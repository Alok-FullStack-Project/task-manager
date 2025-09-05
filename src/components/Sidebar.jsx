"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LogOut, LayoutDashboard, ListTodo, PlusCircle, User } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/tasks", label: "My Tasks", icon: ListTodo },
    { href: "/tasks/add", label: "Add Task", icon: PlusCircle },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <aside className="w-64 bg-blue-700 text-white flex flex-col justify-between min-h-screen">
      {/* Logo */}
      <div>
        <div className="p-6 text-2xl font-extrabold border-b border-blue-600 tracking-wide">
          TaskManager
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-6 py-3 transition rounded-md ${
                  isActive ? "bg-blue-600 font-semibold" : "hover:bg-blue-600"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-6 border-t border-blue-600">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center justify-center gap-2 bg-red-500 py-2 px-4 rounded-lg hover:bg-red-600 transition font-medium"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
