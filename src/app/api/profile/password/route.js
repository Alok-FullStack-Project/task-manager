import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { oldPassword, newPassword } = await req.json();
  await connectDB();

  const user = await User.findById(session.user.id);
  if (!user) return new Response("User not found", { status: 404 });

  const isValid = await bcrypt.compare(oldPassword, user.password);
  if (!isValid) return new Response("Invalid current password", { status: 400 });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  return Response.json({ message: "Password updated successfully" });
}
