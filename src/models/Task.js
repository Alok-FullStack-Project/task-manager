import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 👈 must match your User model name
      required: true,
    },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  dueDate: { type: Date,required: true },
  completedAt: { type: Date, default: null }, // ✅ New field
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
