"use server";

import * as z from "zod";
import db from "@/lib/db";
import { OnboardAdminSchema, OnboardStudentSchema } from "../../_schema";
import { auth } from "@/auth";

export const useOnboardAdmin = async (
  values: z.infer<typeof OnboardAdminSchema>
) => {
  const user = await auth();
  const validatedFields = OnboardAdminSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  const { firstname, lastname, accountNumber, role } = validatedFields.data;

  if (!accountNumber) {
    return { error: "Please enter your account number" };
  }

  if (!role) {
    return { error: "Please select a role" };
  }

  if (!firstname || !lastname) {
    return { error: "Please enter your name" };
  }
  try {
    const updateUser = await db.user.update({
      where: {
        id: user?.user?.id,
      },
      data: {
        firstName: firstname,
        lastName: lastname,
        onboarded: true,
        role: role as "ADMIN" | "USER",
      },
    });
    return { user: updateUser, success: "User created" };
  } catch (error) {
    return { message: "Error Onboading", error: error };
  }
};

export const useOnboardStudent = async (
  values: z.infer<typeof OnboardStudentSchema>
) => {
  const user = await auth();
  const validatedFields = OnboardStudentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  const {
    firstname,
    lastname,
    othername,
    department,
    tribe,
    state,
    gender,
    role,
  } = validatedFields.data;

  if (!firstname || !lastname) {
    return { error: "Please enter your name" };
  }

  if (!department || !tribe || !state || !gender) {
    return { error: "Please enter your details" };
  }

  try {
    const updateUser = await db.user.update({
      where: {
        id: user?.user?.id,
      },
      data: {
        firstName: firstname,
        lastName: lastname,
        otherName: othername,
        department,
        tribe,
        state,
        gender,
        onboarded: true,
        role: role as "ADMIN" | "USER",
      },
    });

    return { user: updateUser, success: "User created" };
  } catch (error) {
    return { message: "Error Onboading", error: error };
  }
};
