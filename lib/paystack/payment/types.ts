export interface PaymentPageType {
  name: string
  description: string | undefined
  amount: number
  transaction_charge: number;
  collect_phone: boolean;
  split_code: string
}
