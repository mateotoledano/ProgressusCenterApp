import { api } from "../api";
// Registrar usuario
export const sendCodeVerificationAuth = async (email, codeString) => {
  try {
    const response = await api.post(
      `/api/Auth/ComprobarCodigoDeConfirmacionCorreo`,
      {
        email: email, // Asegúrate de que el nombre del campo coincide
        codigo: codeString, // Verifica que el campo sea correcto
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
    console.log(error, "error desde el cah");
    return error.response;
  }
};
