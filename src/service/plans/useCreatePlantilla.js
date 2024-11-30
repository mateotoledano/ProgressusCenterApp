import { api } from "../api";
// CONVERTIR PLAN EN PLANTILLA
export const useCreatePlantilla = async (idPlan) => {
  console.log(idPlan);

  try {
    const response = await api.put(
      `/api/PlanDeEntrenamiento/ConvertirPlanEnPlantilla?id=${idPlan}`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error al editar contraseña", error);
  }
};
