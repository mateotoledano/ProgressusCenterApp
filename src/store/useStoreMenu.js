import { create, useStore } from 'zustand'

const useStoreMenu = create((set) => ({
  navBar: false,
  openNavBar : () => set({navBar : true}),
  closeNavBar : () => set({ navBar: false }),
}))

export default useStoreMenu