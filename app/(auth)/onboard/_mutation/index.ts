"use server";

import * as z from "zod";
import { OnboardAdminSchema, OnboardStudentSchema } from "../_schema";
import { auth } from "@/auth";
import { updateUserById } from "@/lib/entities/user";
import { createCustomer } from "@/lib/paystack/customer";
import db from "@/lib/db";
import { createAdmin } from "@/lib/entities/admin";
import { createStudent } from "@/lib/entities/student";

export const UpdateAdmin = async (
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
    const updateAdmin = await createAdmin({
      id: "",
      userId: user?.user.id as string,
      firstname,
      lastname,
      accountNumber,
    });

    const updateUser = await updateUserById(user?.user.id as string, {
      onboarded: true,
      role: "ADMIN"
    });

    const customer = await createCustomer({
      first_name: updateAdmin?.admin?.firstname,
      last_name: updateAdmin?.admin?.lastname,
      email: updateUser?.email,
      phone: updateUser?.phone,
    });

    return { user: updateUser, customer, success: "User created" };
  } catch (error) {
    return { message: "Error Onboading", error: error };
  }
};



export const UpateStudent = async (
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
  } = validatedFields.data;

  if (!firstname || !lastname) {
    return { error: "Please enter your name" };
  }

  if (!department || !tribe || !state || !gender) {
    return { error: "Please enter your details" };
  }

  try {
    const updateStudent = await createStudent({
      id: "",
      userId: user?.user.id as string,
      firstName: firstname,
      lastName: lastname,
      otherName: othername,
      department,
      tribe,
      state,
      gender,
    });

     await updateUserById(user?.user.id as string, {
      onboarded: true,
    });

    return { user: updateStudent, success: "User created" };
  } catch (error) {
    return { message: "Error Onboading", error: error };
  }
};
