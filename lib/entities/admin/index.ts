import db from "@/lib/db";
import { Admin } from "@prisma/client";

export const createAdmin = async (data: Admin) => {
  try {
    const admin = await db.admin.create({
      data: {
        userId: data.userId,
        firstname: data.firstname,
        lastname: data.lastname,
        accountNumber:data.accountNumber,
      },
    });
    return {admin};
  } catch (error) {
    return {
      error,
    };
  }
};
