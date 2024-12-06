import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePlanParaVer = create(
  persist(
    (set) => ({
      planParaVer: null,
      isEditable: false, 
      setPlanParaVer: (plan) => set({ planParaVer: plan }), 
      setIsEditable: (editable) => set({ isEditable: editable }), 
    }),
    {
      name: "plan-para-ver",
      getStorage: () => localStorage,
    }
  )
);

export default usePlanParaVer;
