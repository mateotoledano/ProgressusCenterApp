import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useRegisterComoMp = async (idSolicitud) => {
  console.log(idSolicitud, "paramssssss");

  try {
    const response = await api.put(
      `/api/SolicitudDePago/RegistrarPagoConMercadoPago?idSolicitudDePago=${idSolicitud}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error al enviar la reserva con mp:");
  }
};
