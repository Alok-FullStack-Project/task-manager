"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import TaskCards from "@/components/TaskCards";
import Footer from "@/components/Footer";
import RecentTasks from "@/components/RecentTasks";

export default function DashboardPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await axios.get("/api/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [session, router]);

  if (!session) return null;

  return (
  <>
  <TaskCards tasks={tasks} loading={loading} />
          <br/>
  <RecentTasks tasks={tasks} />
       
  </>
          
  );
}
