import { api } from "../api";

//ASIGNAR PLAN
export const useAsignarPlan = async (socioId, planId) => {
  try {
    const response = await api.post(
      `/api/AsignacionDePlan/AsignarPlanDeEntrenamiento?socioId=${socioId}&planId=${planId}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error al asignar plan", error);
  }
};
