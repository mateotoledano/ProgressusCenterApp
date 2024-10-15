import { api } from "../api";
// Registrar usuario
export const useAuthValidation = async (email) => {
  try {
    const response = await api.post(
      `/api/Auth/EnviarCodigoDeVerificacionConfirmarEmail`,
      {
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error al registrar usuario:", error.response.data.errors);
    return error.response.data.errors;
  }
};
