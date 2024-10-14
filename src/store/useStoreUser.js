import { create, useStore } from 'zustand';
// GUARDAR USUARIO
const useStoreUser = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));

export default useStoreUser;
