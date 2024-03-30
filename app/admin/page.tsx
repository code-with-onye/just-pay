import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
export default async function AdminPage() {
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </>
  );
}
