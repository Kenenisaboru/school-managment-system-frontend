import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  setCredentials: ({ token, user }) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}));


