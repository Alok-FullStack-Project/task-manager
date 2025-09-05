import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
  }

  const users = await User.find().select("-password"); // hide password
  return new Response(JSON.stringify(users), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
  }

  try {
    const { name, email, password, role, status } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
      status: status || "active",
    });

    await newUser.save();

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server Error" }), { status: 500 });
  }
}
