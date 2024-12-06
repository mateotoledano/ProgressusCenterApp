
import { api } from "../api";

// TRAER NRO DE ASISTENCIA POR DIA
export const useGetAsistForDay = async () => {
  try {
    const response = await api.get(
      `/api/ReservasTurnos/ObtenerNumeroDeAsistenciasPorDiaDeSemana`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
