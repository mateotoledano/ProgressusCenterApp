
import { api } from "../api";

// TRAER LA DATA DEL USUARIO
export const useDeleteTurns = async (idUser) => {
  try {
    const response = await api.delete(`/api/ReservasTurnos/eliminar/${idUser}`);
    console.log(response , "delte turnos");
    return response;
  } catch (e) {
    console.log(e, "errores delte trns");
  }
};
