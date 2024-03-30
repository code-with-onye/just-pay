import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import db from "./lib/db";
import authConfig from "./auth.config";
import { UserRole } from "@prisma/client";
import { getUserById } from "./lib/entities/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  callbacks: {
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      token.role = existingUser.role;
      token.name = existingUser.firstName;
      token.accessToken = existingUser.accessToken;

      return token;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (token.name && session.user) {
        session.user.name = token.name;
      }

      if (token.accessToken && session.user) {
        session.user.accessToken = token.accessToken as string;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
