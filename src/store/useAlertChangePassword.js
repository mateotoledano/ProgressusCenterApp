import { create } from "zustand";

export const useAlertStore = create((set) => ({
  alertSuccess: false,
  alertDanger: false,
  setAlertSuccess: (value) => set({ alertSuccess: value }),
  setAlertDanger: (value) => set({ alertDanger: value }),
}));
