import { create } from "zustand";
export const useLoginStore = create((set) => ({
  isLoggedIn: false,
  user: "",
  setIsLoggedIn: (log) => set(() => ({ isLoggedIn: log })),
  setUser: (log) => set(() => ({ user: log })),
}));
export const useLogin = () => useLoginStore((state) => state.isLoggedIn);
export const useUser = () => useLoginStore((state) => state.user);
