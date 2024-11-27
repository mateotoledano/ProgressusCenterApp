import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePlanParaVer = create(
  persist(
    (set) => ({
      planParaVer: null, // Estado inicial del plan
      isEditable: false, // Estado inicial para determinar si es editable
      setPlanParaVer: (plan) => set({ planParaVer: plan }), // Acción para actualizar el estado del plan
      setIsEditable: (editable) => set({ isEditable: editable }), // Acción para actualizar el estado de edición
    }),
    {
      name: "plan-para-ver", // Nombre de la clave en el Local Storage
      getStorage: () => localStorage, // Por defecto es localStorage
    }
  )
);

export default usePlanParaVer;
