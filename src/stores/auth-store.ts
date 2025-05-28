import { create } from "zustand";

interface AuthStore {
  accessToken: string | null;
  loginAuth: (accessToken: string) => void;
  logoutAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  loginAuth: (accessToken: string) => set({ accessToken }),
  logoutAuth: () => set({ accessToken: null }),
}));
