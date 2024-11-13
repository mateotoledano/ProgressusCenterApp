// store.js
import { create } from "zustand";

export const useSpinnerStore = create((set) => ({
  isLoading: false,
  showSpinner: () => set({ isLoading: true }),
  hideSpinner: () => set({ isLoading: false }),
}));
