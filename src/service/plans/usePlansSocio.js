import { api } from "../api";

// TRAER PLANES PLANTILLAS
export const usePlansSocio = async (socioId) => {
    console.log(socioId , "socio idddd");
    
  try {
    const response = await api.get(
      `/api/AsignacionDePlan/ObtenerPlanAsignado?socioId=${socioId}` 
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
