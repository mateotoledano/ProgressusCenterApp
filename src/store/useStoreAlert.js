import { create, useStore } from "zustand";
// ESTADO DEL ALERT DE REACT TOASTIFY
export const useStoreAlert = create((set) => ({
  alert: false,
  openAlert: () => set({ alert: true }),
  closeAlert: () => set({ alert: false }),
}));


