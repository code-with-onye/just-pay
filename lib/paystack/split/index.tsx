"use server";

import { paysackInstance } from "@/lib/axios";
import { SplitPaymentType } from "./types";

export const createSplitPayment = async (account: SplitPaymentType) => {
  try {
    const paymentData = {};
    const payment = paysackInstance.post("/split");
  } catch (error) {
    return { error };
  }
};
