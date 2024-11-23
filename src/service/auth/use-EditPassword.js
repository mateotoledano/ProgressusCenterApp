import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useEditPassword = async (email, token, nuevaContraseña) => {
    console.log();
    
  try {
    const response = await api.put(
      `/api/Auth/RecuperarContraseña`,
      {
        email: email,
        token: token,
        nuevaContraseña: nuevaContraseña,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error al editar contraseña", error);
  }
};
