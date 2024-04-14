"use server";

import { paysackInstance } from "@/lib/axios";
import { PaymentPageType } from "./types";

export const createPaymentPage = async (account: PaymentPageType) => {
  try {
    const payment = await paysackInstance.post("/page", {
      name: account.name,
      amount: account.amount,
      transaction_charge: account.transaction_charge,
      collect_phone: account.collect_phone,
      split_code: account.split_code,
    });
    return { payment };
  } catch (error) {
    return { error };
  }
};

