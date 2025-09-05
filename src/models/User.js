import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: "" },        // ✅ profile image URL
    profileImageFileId: { type: String, default: "" },  // ✅ fileId (Cloudinary, etc.)
    
    role: { type: String, enum: ["user", "admin"], default: "user" }, // ✅ role field
    status: { type: String, enum: ["active", "inactive"], default: "active" }, // ✅ status field
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
