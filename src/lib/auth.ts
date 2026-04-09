import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@harish.dev";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Laksh@123";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@harish.dev" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (credentials.email === ADMIN_EMAIL && credentials.password === ADMIN_PASSWORD) {
          return {
            id: "admin-1",
            name: "Harish Admin",
            email: ADMIN_EMAIL,
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 Days
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};
