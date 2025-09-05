"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut,LayoutDashboard, Users, ListChecks, Settings } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/tasks", label: "Tasks", icon: ListChecks },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Logo / Brand */}
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4">
        <ul>
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                  pathname === href
                    ? "bg-gray-800 text-blue-400"
                    : "hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

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
