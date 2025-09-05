"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileForm from "@/components/ProfileForm";
import PasswordForm from "@/components/PasswordForm";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/profile");
        setProfile(res.data);
        console.log("Profile data " + res.data.email);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (session) fetchProfile();
  }, [session]);

  if (status === "loading" || loading) {
    return <p className="p-6 text-gray-500">Loading profile...</p>;
  }

  if (!profile) {
    return <p className="p-6 text-red-500">Profile not found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <ProfileForm profile={profile} />
        <PasswordForm />
    </div>
  );
}
