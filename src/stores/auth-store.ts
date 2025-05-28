import type { UserType } from "@/types/api-types";
import { create } from "zustand";

interface AuthStore {
  accessToken: string | null;
  userInfo: UserType | null;
  loginAuth: (accessToken: string) => void;
  setUser: (userInfo: UserType) => void;
  logoutAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  userInfo: null,
  loginAuth: (accessToken: string) => set({ accessToken }),
  setUser: (userInfo: UserType) => set({ userInfo }),
  logoutAuth: () => set({ accessToken: null, userInfo: null }),
}));
