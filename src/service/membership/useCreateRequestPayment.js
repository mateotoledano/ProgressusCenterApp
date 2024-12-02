import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useCreateRequestPayment = async (
  membresiaId,
  tipoDePagoId,
  idUser
) => {
  console.log(membresiaId, tipoDePagoId, idUser, "paramssssss");

  try {
    const response = await api.post(
      `/api/SolicitudDePago/CrearSolicitudDePago`,
      {
        socioId: idUser,
        membresiaId: membresiaId,
        tipoDePagoId: tipoDePagoId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  console.log(response , "response en la api");
  
    return response;
  } catch (error) {
    console.log("Error al enviar la reserva:");
  }
};
