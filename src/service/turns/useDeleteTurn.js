
import { api } from "../api";

// ELIMINAR UN TURNO
export const useDeleteTurn = async (idTurn) => {
  try {
    const response = await api.delete(`/api/ReservasTurnos/eliminarConId/${idTurn}`);
    console.log(response , "delte turnos");
    return response;
  } catch (e) {
    console.log(e, "errores delte trns");
  }
};
