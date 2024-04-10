import db from "@/lib/db";
import { Student } from "@prisma/client";

export const createStudent = async (data: Student) => {
  try {
    const student = db.student.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        otherName: data.otherName,
        state: data.state,
        tribe: data.tribe,
        department: data.department,
        userId: data.userId,
      },
    });

    return { student };
  } catch (error) {
    return {
      error,
    };
  }
};
