
type subaccounts = {
    subaccount: string,
    share: number
}

export interface SplitPaymentType {
    currency: string;
    subaccounts: subaccounts[];
    bearer_type: string;
    bearer_subaccount:string
}