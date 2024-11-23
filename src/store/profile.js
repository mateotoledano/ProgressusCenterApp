import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserProfile = create(
  persist(
    (set) => ({
      userImage: "/avatars/userDefault.jpg", // Estado inicial para la imagen
      setUserImage: (newImage) => set({ userImage: newImage }), // Acción para actualizar la imagen
      clearUserImage: () => set({ userImage: "" }), // Acción para limpiar la imagen
    }),
    {
      name: "user-photo-profile", // Nombre de la clave en localStorage
    }
  )
);
