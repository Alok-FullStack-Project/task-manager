"use client";
import { useState } from "react";
import axios from "axios";

export default function PasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("❌ New passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.put("/api/profile/password", {
        oldPassword,
        newPassword,
      });

      if (res.status === 200) {
        setMessage("✅ Password updated successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setMessage("❌ Error updating password: " + err.response?.data || "Try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handlePasswordUpdate}
      className="space-y-4 bg-gray-50 p-6 rounded-lg shadow mt-6"
    >
      <h2 className="text-lg font-semibold text-gray-800">Update Password</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">Current Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>

      {message && (
        <p className="text-sm mt-2 text-center font-medium">
          {message}
        </p>
      )}
    </form>
  );
}
