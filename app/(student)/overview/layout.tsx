import { auth } from "@/auth";
import { getIsUserOnboarded } from "@/lib/entities/user";
import { redirect } from "next/navigation";

export default async function OverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await auth();

  // const isUserOnboarded = await getIsUserOnboarded(user?.user.id as string);

  // if (!isUserOnboarded) {
  //   redirect("/onboard");
  // }

  // if (!user?.user.role || user.user.role !== "USER") {
  //   redirect("/admin");
  // }

  return <>{children}</>;
}
