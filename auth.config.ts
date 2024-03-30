import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import { SigninSchema } from "./app/(auth)/_schema";
import { useGetUserByEmail } from "./lib/hooks/action/user";

export default {
  providers: [
    Credentials({
        async authorize(credentials) {
          const validatedFields = SigninSchema.safeParse(credentials);
  
          if (validatedFields.success) {
            const { email, password } = validatedFields.data;
  
            const user = await useGetUserByEmail(email);
  
            if (!user || !user.password) return null;
  
            const passwordsMatch = await bcrypt.compare(password, user.password);
  
            if (passwordsMatch) return user;
          }
  
          return null;
        },
      }),
  ],
} satisfies NextAuthConfig;
