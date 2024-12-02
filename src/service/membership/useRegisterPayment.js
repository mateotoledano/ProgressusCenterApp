import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useRegisterPayment = async (idRequestPayment) => {
  console.log(idRequestPayment , "id request payment");
  
  try {
    const response = await api.put(
      `/api/SolicitudDePago/RegistrarPagoEnEfectivo?idSolicitudDePago=${idRequestPayment}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
   console.log(response , "response registrar pago");
   
    return response;
  } catch (error) {
    console.log("Error al enviar la reserva:");
  }
};
