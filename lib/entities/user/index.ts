import db from "@/lib/db";
import { User } from "@prisma/client";

interface UserData {
  [key: string]: User[keyof User];
}

export const getUserByEmail = async (email: string) => {
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

export const updateUserById = async <T extends UserData>(id: string, data: T) => {
  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data,
    });
    return user;
  } catch (error) {
    return null;
  }
}

export const getUserById = async (id: string) => {
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

export const getIsUserOnboarded = async (id: string) => {
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

