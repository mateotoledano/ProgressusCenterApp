import { api } from "../api";
// Login usuario
export const sendCodeRecuperarPassword = async (email) => {
  try {
    const response = await api.post(
      `/api/Auth/EnviarCodigoDeVerificacionRecuperarContraseña`,
      {
        email: email,
   
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    
    return response
  } catch (error) {
    console.error("Error al enviar mail para recuperar password", error.response.data.errors);

    return error;
  }
};
