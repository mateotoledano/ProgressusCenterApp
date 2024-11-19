import {create} from 'zustand';


import { persist } from 'zustand/middleware';

export const useMembershipStore = create(
  persist(
    (set) => ({
      membershipData: null,
      setMembershipData: (data) => set({ membershipData: data }),
    }),
    {
      name: 'membership-store', // nombre que se usará en localStorage
      getStorage: () => localStorage, // Esto indica que se usará localStorage
    }
  )
);
