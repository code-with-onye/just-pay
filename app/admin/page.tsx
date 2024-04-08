import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { AdminDashboardLayout } from "./_components/dashboard-layout";
import { currentUser } from "@/lib/entities/auth";
export default async function AdminPage() {
  const user = await currentUser();

  return (
    <>
      {/* {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form> */}

      <AdminDashboardLayout user={{
        name: user?.name,
        email: user?.email,
        image: user?.image,
        id: user?.id,
        role: user?.role,
        onboarded: user?.onboarded
      }} />
    </>
  );
}
