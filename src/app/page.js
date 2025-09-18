import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/authOptions";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session?.user?.role === "user") {
    redirect("/dashboard");
  }

  if (session?.user?.role === "admin") {
    redirect("/admin");
  }

  // fallback (if role is missing or unknown)
  redirect("/login");
}
