import * as z from "zod";

export const SigninSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Please enter a password" }),
});

export const SignupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Please enter a password" }),
  phone: z
    .string()
    .min(11, { message: "Your phone number should not be less than 11 digit" })
    .max(11, { message: "Your phone number should not be more than 11 digit" }),
});


