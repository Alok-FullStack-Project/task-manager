import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import Task from "@/models/Task";

export async function GET(req, { params }) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }

  const task = await Task.findById(params.id);
  console.log(task);
  if (!task) return new Response("Task not found", { status: 404 });

  return Response.json(task);
}

export async function PUT(req, { params }) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const updatedTask = await Task.findByIdAndUpdate(params.id, body, { new: true });

  if (!updatedTask) return new Response("Task not found", { status: 404 });

  return Response.json(updatedTask);
}


export async function DELETE(req, { params }) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return new Response("Unauthorized", { status: 401 });
  }

  const deletedTask = await Task.findByIdAndDelete(params.id);

  if (!deletedTask) {
    return new Response("Task not found", { status: 404 });
  }

  return Response.json({ message: "Task deleted successfully" });
}