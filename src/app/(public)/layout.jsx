"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Link from "next/link";

export default function PublicLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 🔑 Redirect after render, not during render
  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  // While checking session → show spinner
  if (status === "loading") {
    return <LoadingScreen />;
  }

  // If logged in, nothing to render (redirecting)
  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link href="/" className="text-xl font-bold text-blue-600">
            Task Manager
          </Link>
          <div className="space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
              Login
            </Link>
            <Link href="/register" className="text-gray-700 hover:text-blue-600 font-medium">
              Register
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TaskManager. All rights reserved.
      </footer>
    </div>
  );
}
