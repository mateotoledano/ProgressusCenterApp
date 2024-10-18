import { create, useStore } from "zustand";

export const useStoreSelectAuth = create((set) => ({
  auth: "login",
  authLogin: () => set({ auth: "login" }),
  authRegister: () => set({ auth: "register" }),
}));
