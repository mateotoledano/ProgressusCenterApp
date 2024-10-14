import { create, useStore } from "zustand";

const useStoreSelectAuth = create((set) => ({
  auth: "login",
  authLogin: () => set({ auth: "login" }),
  authRegister: () => set({ auth: "register" }),
}));

export default useStoreSelectAuth;
