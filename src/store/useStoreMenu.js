import { create, useStore } from 'zustand'

export const useStoreMenu = create((set) => ({
  navBar: false,
  openNavBar : () => set({navBar : true}),
  closeNavBar : () => set({ navBar: false }),
}))

