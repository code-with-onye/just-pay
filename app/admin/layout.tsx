import { auth } from "@/auth";
import { useIsUserOnboarded } from "@/lib/hooks/action/user";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();

  const isUserOnboarded = await useIsUserOnboarded(user?.user.id as string);

  if (isUserOnboarded === false) {
    redirect("/onboard");
  }

  if (!user?.user.role || user.user.role !== "ADMIN") {
    redirect("/overview");
  }

  return <>{children}</>;
}
