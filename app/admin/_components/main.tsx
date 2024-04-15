import { currentUser } from "@/lib/entities/auth";
import {
  deletePaymentLinkByAdminId,
  getPaymentLinkAdminId,
} from "../_mutation/payment";
import CreatePayment from "./create-payment";
import { PaymentCard } from "./payment-card";
import { RecentTransaction } from "./recent-transaction";

export const Main = async () => {
  const user = await currentUser();
  const paymentLinks = await getPaymentLinkAdminId(user?.adminId as string);

  return (
    <div className="mx-3 flex flex-col gap-y-3">
      {/* Create payment  */}
      <CreatePayment />
      {/* No of Student paid */}
      {/* Total amount paid */}
      {/* Card of payment links or dues */}
      <section className="w-full">
        {paymentLinks.length === 0 ? (
          <span className="text-sm my-2">No payment links created</span>
        ) : (
          <>
            <span className="text-sm my-2">View all</span>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              {paymentLinks.map((paymentLink) => (
                <PaymentCard
                  key={paymentLink.id}
                  createdPaymentLinks={paymentLink}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Recent transaction table */}
      {/* <RecentTransaction /> */}
    </div>
  );
};
