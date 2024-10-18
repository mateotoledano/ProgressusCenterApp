import { create } from "zustand";

export const useStoreTime = create((set) => ({
  time: null,
  date: null,

  setTime: (newTime) => set({ time: newTime }),
  setDate: (newDate) => set({ date: newDate }),

  clearTime: () => set({ time: null }),
  clearDate: () => set({ date: null }),

  clearAll: () => set({ time: null, date: null }),
}));


