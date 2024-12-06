import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserProfile = create(
  persist(
    (set) => ({
      userImage: "/avatars/defAvatar.jpg", 
      setUserImage: (newImage) => set({ userImage: newImage }), 
      clearUserImage: () => set({ userImage: "" }), 
    }),
    {
      name: "user-photo-profile", 
    }
  )
);
