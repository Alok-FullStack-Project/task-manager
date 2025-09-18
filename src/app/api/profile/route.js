import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  await connectDB();
  const user = await User.findById(session.user.id).select("name email profileImage");
  return Response.json(user);
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
const body = await req.json();
   const updateData = { name: body.name };
  if (body.profileImage) updateData.profileImage = body.profileImage;

  const user = await User.findByIdAndUpdate(session.user.id, updateData, {
    new: true,
  }).select("name email profileImage");

  return Response.json(user);

  /*const body = await req.json();
  await connectDB();

  const user = await User.findByIdAndUpdate(
    session.user.id,
    { name: body.name },
    { new: true }
  ).select("name email");
  console.log(user);

  return Response.json(user);*/
}
