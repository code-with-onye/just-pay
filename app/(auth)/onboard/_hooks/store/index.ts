import { UserRole } from "@prisma/client";
import { create } from "zustand";

// Define the type for the role store state
interface RoleState {
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
}

const useRoleStore = create<RoleState>((set) => ({
  role: "USER",
  setRole: (role) => set({ role }),
}));

export default useRoleStore;
