"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // While checking session → show loading spinner
  if (status === "loading") {
    return <LoadingScreen />;
  }

  // If not logged in → redirect to login
  if (!session) {
    router.replace("/login");
    return null;
  }

  // If logged in but not admin → redirect to user dashboard
  if (session?.user?.role !== "admin") {
    router.replace("/dashboard");
    return null;
  }

  return (
      <div className="flex min-h-screen bg-gray-100">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <Topbar user={session.user} />
            <main className="flex-1 p-6">{children}</main>
            <Footer />
          </div>
        </div>
  );
}
