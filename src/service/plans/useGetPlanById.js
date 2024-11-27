import { api } from "../api";

// TRAER PLAN POR ID
export const useGetPlanById = async (idPlan) => {
    console.log(idPlan , "id plannn");
    
  try {
    const response = await api.get(
      `/api/PlanDeEntrenamiento/ObtenerPlanPorId?id=${idPlan}`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
