import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb-client";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@ainseconds.com";
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || "admin-secret";

const googleId = process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_USS_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_USS_SECRET;

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.MONGODB_USS_DB || process.env.MONGODB_DB,
  }),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_USS_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    // Conditionally add Google if env vars provided
    ...(googleId && googleSecret
      ? [
          GoogleProvider({
            clientId: googleId,
            clientSecret: googleSecret,
            allowDangerousEmailAccountLinking: true,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Simple admin credential check. Replace with real user validation later.
        if (
          credentials.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
          credentials.password === ADMIN_SECRET_KEY
        ) {
          return {
            id: "admin",
            name: "Admin User",
            email: ADMIN_EMAIL,
            image: null,
            role: "admin" as const,
          } as any;
        }

        // No other credentials-supported users yet
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        // Initial sign in
        token.id = (user as any).id || token.sub;
        token.role = (user as any).role || token.role || "user";
      }
      // On provider-based accounts, ensure role at least 'user'
      if (!token.role) token.role = "user";
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub || (token as any).id;
        (session.user as any).role = (token as any).role || "user";
      }
      return session;
    },
  },
};

export default authOptions;
