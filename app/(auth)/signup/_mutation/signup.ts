"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { SignupSchema } from "../../_schema";
import db from "@/lib/db";
import { getUserByEmail } from "@/lib/entities/user";

export const SignUp = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  const { email, password, phone } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already exists" };
  }

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      phone,
    },
  });

  // TODO: Send email verification
  return { success: "User created", user };
};
