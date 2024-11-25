import { api } from "../api";
// Login usuario
export const loginUser = async (email, password) => {
  try {
   const response = await api.post(
      `/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000, // Tiempo límite de espera en milisegundos (10 segundos)
      }
    );

    
    return response
  } catch (error) {
    console.error("Error al registrar usuario:", error.response.data.errors);

    return error;
  }
};
