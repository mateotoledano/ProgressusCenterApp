import {create} from 'zustand';


import { persist } from 'zustand/middleware';

export const useMembershipStore = create(
  persist(
    (set) => ({
      membershipData: null,
      setMembershipData: (data) => set({ membershipData: data }),
    }),
    {
      name: 'membership-store', 
      getStorage: () => localStorage, 
    }
  )
);
