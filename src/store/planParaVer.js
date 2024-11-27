import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePlanParaVer = create(
  persist(
    (set) => ({
      planParaVer: null, // Estado inicial
      setPlanParaVer: (plan) => set({ planParaVer: plan }), // Acción para actualizar el estado
    }),
    {
      name: "plan-para-ver", // Nombre de la clave en el Local Storage
      getStorage: () => localStorage, // Por defecto es localStorage
    }
  )
);

export default usePlanParaVer;
