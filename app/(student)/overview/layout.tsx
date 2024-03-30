import { auth } from "@/auth";
import { useIsUserOnboarded } from "@/lib/hooks/action/user";
import { redirect } from "next/navigation";

export default async function OverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();

  const isUserOnboarded = await useIsUserOnboarded(user?.user.id as string);

  if (!isUserOnboarded) {
    redirect("/onboard");
  }

  if (!user?.user.role || user.user.role !== "USER") {
    redirect("/admin");
  }

  return <>{children}</>;
}
