import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useCancelRequestPayment = async (idRequestPayment) => {
  try {
    const response = await api.put(
      `/api/SolicitudDePago/CancelarSolicitudDePago?idSolicitudDePago=${idRequestPayment}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error al enviar la reserva:");
  }
};
