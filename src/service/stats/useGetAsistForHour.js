import { api } from "../api";

// TRAER NRO DE ASISTENCIA POR MES
export const useGetAsistForHour = async (hora) => {
  try {
    const response = await api.get(
      `/api/ReservasTurnos/ObtenerAsistenciasPorHora/${hora}`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
