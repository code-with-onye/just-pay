import { auth, signOut } from "@/auth";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};

export const logout = async () => {
  try {
    await signOut();
    return { success: true };
  } catch (error) {
    return { error}
  }
};

export const duesApproved = async () => {
  const session = await auth()
  return  session?.user.duesapproved
}

