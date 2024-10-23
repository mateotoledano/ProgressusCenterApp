import { create } from "zustand";
import { persist } from "zustand/middleware";

// GUARDAR TOKEN
export const useStoreUser = create(
  persist(
    (set, get) => ({
      remember: false,
      token: null,

      setRemember: (rememberValue) => set({ remember: rememberValue }),

      setToken: (userData) => {
        const remember = get().remember;
        set({ token: userData });

        // Si no quiere recordar, no persistir el token
        if (!remember) {
          sessionStorage.setItem("token", userData);
          localStorage.removeItem("auth");
        }
      },

      clearToken: () => {
        sessionStorage.removeItem("token");
        set({ token: null, remember: false });
      },
    }),
    {
      name: "auth", // Usado para la persistencia
      getStorage: () => localStorage, // Define que persista en localStorage
    }
  )
);
