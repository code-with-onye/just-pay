"use server";
import { Customer } from "./types";
import { paysackInstance } from "@/lib/axios";

export const createCustomer = async (user: Customer) => {
  try {
    const customer = paysackInstance.post(`/customer`, {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
    });

    return { customer };
  } catch (error) {
    return {
      error,
    };
  }
};
