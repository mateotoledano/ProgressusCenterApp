import { api } from "../api";
// Login usuario
export const recuperarVerificarCodigoValidacion  = async (email, code) => {
    console.log(email , "email" , code , "code");
  try {
    const response = await api.post(
      `/api/Auth/ComprobarCodigoDeRecuperarContraseña`,
      {
        email: email,
        codigo: code,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Error al enviar mail para recuperar password",
      error.response.data.errors
    );

    return error;
  }
};
