import db from "@/lib/db";
import { auth } from "@/auth";

export const useGetUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const useGetUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
export const useIsUserOnboarded = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        onboarded: true,
      },
    });
    return user?.onboarded;
  } catch (error) {
    return null;
  }
}
