import { create } from "zustand";

interface UserState {
  full_name: string;
  email: string;
  country: string;
  setDetails: (details: {
    full_name: string;
    email: string;
    country: string;
  }) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  full_name: "",
  email: "",
  country: "",
  setDetails: (details) => set({ ...details }),
  resetUser: () => set({ full_name: "", email: "", country: "" }),
}));
