import { create } from "zustand";

type SignupState = {
  phone: string;
  email: string;
  password?: string;
};

type RegisterActions = {
  user: SignupState;
  setUser: (user: SignupState) => void;
};

export const useSignUpStore = create<RegisterActions>((set) => ({
  user: {
    phone: "",
    email: "",
    password: "",
  },
  setUser: (user) => set((state) => ({ ...state.user, user })),
}));


type SignupStepState = {
  step: number;
  setStep: (step: number) => void;
  moveForward: () => void;
  moveBack: () => void;
};

export const useSignupStep = create<SignupStepState>((set) => ({
  step: 0,
  setStep: (step) => set({ step }),
  moveForward: () => set((state) => ({ step: state.step + 1 })),
  moveBack: () => set((state) => ({ step: state.step - 1 })),
}));
