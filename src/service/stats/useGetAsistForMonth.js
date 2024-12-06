import { api } from "../api";

// TRAER NRO DE ASISTENCIA POR MES
export const useGetAsistForMonth = async () => {
  try {
    const response = await api.get(
      `/api/ReservasTurnos/ObtenerNumeroDeAsistenciasPorMes`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
