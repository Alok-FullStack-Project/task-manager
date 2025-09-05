"use client";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/LoadingScreen";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  // While checking session → show spinner
  if (status === "loading") {
    return <LoadingScreen />;
  }

  // Not logged in → redirect to login
  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar user={session.user} />
        <main className="flex-1 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
