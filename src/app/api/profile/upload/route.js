import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import imagekit from "@/lib/imagekit";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const user = await User.findById(session.user.id);

  // ✅ If user already has an image, delete the old one
  if (user.profileImageFileId) {
    try {
      await imagekit.deleteFile(user.profileImageFileId);
    } catch (err) {
      console.error("Error deleting old image:", err.message);
    }
  }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to ImageKit
    const uploadRes = await imagekit.upload({
      file: buffer,
      fileName: `${session.user.id}-profile-${Date.now()}.jpg`,
      folder: "profile-images",
    });

    // Save URL in MongoDB
    await User.findByIdAndUpdate(session.user.id, {
      profileImage: uploadRes.url,
      profileImageFileId : uploadRes.fileId
    });

    return NextResponse.json({ profileImage: uploadRes.url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
