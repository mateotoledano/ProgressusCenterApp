import { create } from "zustand";

// GUARDAR TOKEN CON CONDICIÓN
export const useStoreUser = create((set, get) => ({
  remember: false, // Estado que determina si se debe recordar el usuario
  token: null, // Estado del token

  // Setear el valor de 'recordar usuario'
  setRemember: (rememberValue) => set({ remember: rememberValue }),

  // Setear el token dependiendo de la opción 'recordar usuario'
  setToken: (userData) => {
    const remember = get().remember; // Obtener el estado de "recordar usuario"

    set({ token: userData });

    if (remember) {
      // Si se selecciona "recordar usuario", guarda el token en localStorage
      localStorage.setItem("auth-token", userData);
      sessionStorage.removeItem("auth-token"); // Asegúrate de que no esté en sessionStorage
    } else {
      // Si no se selecciona "recordar usuario", guarda el token en sessionStorage
      sessionStorage.setItem("auth-token", userData);
      localStorage.removeItem("auth-token"); // Elimina el token de localStorage si existiera
    }
  },

  // Limpiar el token de ambos lugares y resetear el estado
  clearToken: () => {
    sessionStorage.removeItem("auth-token");
    localStorage.removeItem("auth-token");
    set({ token: null, remember: false });
  },
}));
