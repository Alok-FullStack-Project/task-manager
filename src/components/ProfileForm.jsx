"use client";
import { useState } from "react";
import axios from "axios";

export default function ProfileForm({ profile }) {
  const [name, setName] = useState(profile.name || "");
  const [email] = useState(profile.email || "");
  const [profileImage, setProfileImage] = useState(profile.profileImage || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("/api/profile/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfileImage(res.data.profileImage);
      setSuccess(true);
      await update();
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await axios.put("/api/profile", { name });
      setSuccess(true);
       await update();
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-50 p-6 rounded-lg shadow"
    >
      <div className="flex items-center space-x-4">
        <img
          src={profileImage || "/default-avatar.png"}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border"
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {success && (
        <p className="text-green-600 text-sm mt-2">
          ✅ Profile updated successfully
        </p>
      )}
    </form>
  );
}
