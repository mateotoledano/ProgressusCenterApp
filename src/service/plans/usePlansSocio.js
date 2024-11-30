import { api } from "../api";

// TRAER PLANES PLANTILLAS
export const usePlansSocio = async (socioId) => {
    console.log(socioId , "socio idddd");
    
  try {
    const response = await api.get(
      `/api/AsignacionDePlan/ObtenerPlanAsignado?socioId=52219ebe-53b3-4722-96a0-1de15dd83f63`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
