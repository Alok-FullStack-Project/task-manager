import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");

          // ✅ Block inactive users
        if (user.status === "inactive") {
          throw new Error("Your account is inactive. Please contact admin.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        // ✅ convert _id to string
        return { id: user._id.toString(), name: user.name, email: user.email, role: user.role ,profileImage : user.profileImage};
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) 
        {
          token.id = user.id;
          token.profileImage = user.profileImage || null; // ✅ pass profileImage into token
          token.role = user.role
        }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
         session.user.id = token.id;
         session.user.profileImage = token.profileImage || null; // ✅ pass profileImage into token
         session.user.role = token.role
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" }
};

// ✅ only wrap once here
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
