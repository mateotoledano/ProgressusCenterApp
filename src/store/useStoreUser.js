import { create } from "zustand";
import { persist } from "zustand/middleware";
// GUARDAR TOKEN
export const useStoreUser = create(
  persist(
    (set) => ({
      remember: false,
      token: null,

      setRemember: (rememberValue) => set({ remember: rememberValue }),

      setToken: (userData) => set({ token: userData }),

      clearToken: () => set({ token: null, remember: false }),
    }),
    {
      name: "auth",
    }
  )
);
