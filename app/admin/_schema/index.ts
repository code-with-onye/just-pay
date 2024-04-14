import * as z from "zod";

export const PaymentLinkSchema = z.object({
    title: z.string().min(1, { message: "Please enter a title" }),
    description: z.string().optional(),
    price: z.string().min(1, { message: "Please enter a price" }),
    link: z.string(),
    adminId: z.string(),
    
})