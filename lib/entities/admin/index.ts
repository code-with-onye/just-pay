import { PaymentLinkSchema } from "@/app/admin/_schema";
import db from "@/lib/db";
import { Admin } from "@prisma/client";
import { link } from "fs";
import { z } from "zod";

export const createAdmin = async (data: Admin) => {
  try {
    const admin = await db.admin.create({
      data: {
        userId: data.userId,
        firstname: data.firstname,
        lastname: data.lastname,
        accountNumber: data.accountNumber,
      },
    });
    return { admin };
  } catch (error) {
    return {
      error,
    };
  }
};

export const createPaymentLink = async ({
  link,
  title,
  adminId,
  price,
}: z.infer<typeof PaymentLinkSchema>) => {
  try {
    const paymentLink = await db.paymentLink.create({
      data: {
        link: link,
        title: title,
        adminId: adminId,
        price: price,
      },
    });

    return {
      data: paymentLink,
    };
  } catch (error) {
    return {
      error,
    };
  }
};
