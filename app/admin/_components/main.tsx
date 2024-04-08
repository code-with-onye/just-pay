import CreatePayment from "./create-payment";
import { PaymentCard } from "./payment-card";
import { RecentTransaction } from "./recent-transaction";

export const Main = () => {
  return (
    <div className="mx-3 flex flex-col gap-y-3">
      {/* Create payment  */}
      <CreatePayment />
      {/* No of Student paid */}
      {/* Total amount paid */}
      {/* Card of payment links or dues */}
      <section className="w-full">
        <span className="text-sm my-2">View all</span>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {[1, 1, 1].map(() => (
            <PaymentCard />
          ))}
        </div>
      </section>

      {/* Recent transaction table */}
      <RecentTransaction/>
    </div>
  );
};
