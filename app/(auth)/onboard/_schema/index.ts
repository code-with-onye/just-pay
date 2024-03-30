import * as z from "zod";


export const OnboardStudentSchema = z.object({
    role: z.string().min(1, { message: "Please select a role" }),
    firstname: z.string().min(1, { message: "Please enter your firstname" }),
    lastname: z.string().min(1, { message: "Please enter your lastname" }),
    othername: z.string(),
    department: z.string().min(1, { message: "Please enter your department" }),
    tribe: z.string().min(1, { message: "Please enter your trib" }),
    state: z.string().min(1, { message: "Please enter your state" }),
    gender: z.string().min(1, { message: "Please enter your gender" }),
  })
  
  export const OnboardAdminSchema = z.object({
    role: z.string().min(1, { message: "Please select a role" }),
    firstname: z.string().min(1, { message: "Please enter your firstname" }),
    lastname: z.string().min(1, { message: "Please enter your lastname" }),
    accountNumber: z.string().min(1, { message: "Please enter your account number" }),   
  })