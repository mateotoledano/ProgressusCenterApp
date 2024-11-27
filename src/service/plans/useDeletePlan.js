import { api } from "../api";

// DELETE PLAN
export const useDeletePlan = async (idPlan) => {
  try {
    const response = await api.delete(
      `/api/PlanDeEntrenamiento/EliminarPlanDeEntrenamiento?id=${idPlan}`
    );
    return response;
  } catch (e) {
    console.log(e, "error al eliminar plan");
  }
};
