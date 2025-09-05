import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import User from "@/models/User";

export async function GET(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const query = status ? { status } : {};

  const tasks = await Task.find(query).populate("userId", "email name");
  console.log(tasks)

  return Response.json(tasks);
}
