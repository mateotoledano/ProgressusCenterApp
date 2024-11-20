import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useEditRoleUser= async (
  userId,
  role
) => {
  console.log(userId, "user id");

  try {
    const response = await api.put(
      `/api/Auth/usuario/${userId}`,
      {
        nuevoRol: role
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
      "Error al enviar la reserva:",
      error.response?.data?.errors || error.message
    );
    return error.response?.data?.errors || error.message;
  }
};
