// src/app/api/admin/stats/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Task from "@/models/Task";

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }

  const usersCount = await User.countDocuments();
  const activeUsers = await User.countDocuments({ status: "active" });
  const inactiveUsers = await User.countDocuments({ status: "inactive" });

  const tasksCount = await Task.countDocuments();
  const completedTasks = await Task.countDocuments({ status: "completed" });
  const pendingTasks = await Task.countDocuments({ status: "pending" });

  return Response.json({
    usersCount,
    activeUsers,
    inactiveUsers,
    tasksCount,
    completedTasks,
    pendingTasks,
  });
}
