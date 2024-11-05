import { create } from "zustand";

// autenticacion
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

// Store para los datos del usuario
export const useStoreUserData = create((set) => ({
  // Estado inicial del usuario (se intenta cargar desde localStorage si existe)
  email: localStorage.getItem("user-email") || "",
  userData: JSON.parse(localStorage.getItem("user-data")) || {
    apellido: "Gimenez",
    email: "admin@admin.com",
    identityUserId: "",
    nombre: "Eduardo",
    roles: [],
    telefono: null,
  },

  // Función para actualizar el email del usuario y guardarlo en localStorage
  setEmail: (data) => {
    set({ email: data });
    localStorage.setItem("user-email", data);
  },

  // Función para actualizar los datos del usuario y guardarlos en localStorage
  setUserData: (data) => {
    set({ userData: data });
    localStorage.setItem("user-data", JSON.stringify(data));
  },
  clearUserData: () => {
    set({
      email: "",
      userData: {
        apellido: "",
        email: "",
        identityUserId: "",
        nombre: "",
        roles: [],
        telefono: null,
      },
    });
    localStorage.removeItem("user-email");
    localStorage.removeItem("user-data");
  },
}));
