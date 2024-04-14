"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createPaymentLink } from "@/lib/entities/admin";
import { z } from "zod";
import { PaymentLinkSchema } from "../../_schema";
import { auth } from "@/auth";
import { createPaymentPage } from "@/lib/paystack/payment";
import { currentUser } from "@/lib/entities/auth";

export const createPayment = async (
  values: z.infer<typeof PaymentLinkSchema>
) => {
  const user = await auth();
  const validatedFields = PaymentLinkSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.issues[0].message };
  }

  const { title, price, link, description } = validatedFields.data;

  if (!title) {
    return { error: "Title is required" };
  }

  if (!price) {
    return { error: "Price is required" };
  }

  try {
    const paymentLink = await createPaymentLink({
      title: title,
      link: link,
      price: price,
      adminId: user?.user.adminId as string,
    });

    const paymentPage = await createPaymentPage({
      name: title,
      description: description,
      amount: parseFloat(price) * 100,
      transaction_charge: 10,
      collect_phone: true,
      split_code: "SPL_1H2rT6MUjI",
    });

    let slug = paymentPage.payment?.data?.data?.slug;

    if (slug) {
      await db.paymentLink.update({
        where: {
          id: paymentLink.data?.id,
        },
        data: {
          link: `https://paystack.com/pay/${slug}`,
        },
      });
    }

    revalidatePath("/admin");
    return {
      data: paymentPage.payment?.data,
      success: "Payment link created successfully",
    };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const getPaymentLinkAdminId = async (adminId: string) => {
  const paymentLinks = await db.paymentLink.findMany({
    where: {
      adminId,
    },
  });

  return paymentLinks;
};

export const deletePaymentLinkByAdminId = async (id: string) => {
  const user = await currentUser();

  if (!user?.adminId) {
    return {
      error: "Admin Id is required",
    };
  }

  if (!id) {
    return {
      error: "Id is required",
    };
  }

  try {
    await db.paymentLink.deleteMany({
      where: {
        id,
        adminId: user?.adminId,
      },
    });

    revalidatePath("/admin");
    return {
      success: "Payment link deleted successfully",
    };
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }
};
