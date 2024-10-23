import { api } from "../api";
// Registrar usuario
export const registerUser = async (email, password) => {
  try {
    const response = await api.post(
      `/register`,
      {
        email: email,
        password: password,
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
const userData = {
  nombre: "Juan",
  apellido: "Pérez",
  email: "franpa619@gmail.com",
  telefono: "1234567890",
  // Otros campos si son necesarios
};
export const registerUserWhitData = async (email, name, lastname, tel) => {
  try {
    const response = await api.post(
      `/api/Auth/RegistrarComoSocio?email=${email}&nombre=${name}&apellido=${lastname}&telefono=${tel}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Error en registerUserWhitData:",
      error.response?.data || error.message
    );
    return error.response?.data || error;
  }
};
