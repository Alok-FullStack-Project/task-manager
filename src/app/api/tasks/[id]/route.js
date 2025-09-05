import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req, { params }) {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { id } = params;
  const body = await req.json();

  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, userId: session.user.id }, 
    body, 
    { new: true }
  );

  if (!updatedTask) return new Response("Task not found", { status: 404 });
  return Response.json(updatedTask);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { id } = await  params;

  const deletedTask = await Task.findOneAndDelete({ _id: id, userId: session.user.id });
  if (!deletedTask) return new Response("Task not found", { status: 404 });

  return Response.json({ message: "Task deleted successfully" });
}

export async function GET(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const task = await Task.findOne({ _id: params.id, userId: session.user.id });
    if (!task) {
      return new Response(JSON.stringify({ message: "Task not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
