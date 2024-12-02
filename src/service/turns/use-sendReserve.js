import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useSendReserve = async (
  userId,
  fecha,
  horaInicio,
  horaFin,
  confirmada
) => {


  try {
    const response = await api.post(
      `/api/ReservasTurnos/crear/`,
      {
        userId: userId,
        fecha: fecha,
        horaInicio: horaInicio, // Enviar directamente como número
        horaFin: horaFin, // Enviar directamente como número
        confirmada: confirmada,
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
