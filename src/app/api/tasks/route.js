import { connectDB } from "@/lib/db";
import Task from "@/models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  //const tasks = await Task.find({ userId: session.user.id });
  //return Response.json(tasks);

  const { search, status } = Object.fromEntries(new URL(req.url).searchParams);

  const query = { userId: session.user.id };

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (status) {
    query.status = status; // filter by status
  }

   const tasks = await Task.find(query)
   .sort({ createdAt: -1 });
       console.log(tasks);
    return Response.json(tasks);


 /*const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  const query = {
    userId: session.user.id,
    ...(search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {}),
  };

  const tasks = await Task.find(query).sort({ createdAt: -1 });
  return Response.json(tasks);*/
}

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  console.log("session :", JSON.stringify(session, null, 2));
  if (!session) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  console.log(body);
  console.log(session.user.id );
  const newTask = await Task.create({ ...body, userId: session.user.id });
  return Response.json(newTask);
}
