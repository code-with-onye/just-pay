import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { AdminDashboardLayout } from "./_components/dashboard-layout";
export default async function AdminPage() {
  const session = await auth();

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

      <AdminDashboardLayout/>
    </>
  );
}
