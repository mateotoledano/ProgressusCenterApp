import { api } from "../api";

// DELETE PLAN
export const useDeleteExercise = async (planId, day, ejercicio) => {
 
  try {
    const response = await api.delete(
      `/api/PlanDeEntrenamiento/QuitarEjercicioAPlan`,
      {
        data: {
          planId: planId,
          diaDePlan: day,
          ejercicioId: ejercicio.ejercicioId,
          series: ejercicio.series,
          repes: ejercicio.repeticiones,
          orden: ejercicio.ordenDeEjercicio,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (e) {
    console.log(e, "error al eliminar plan");
  }
};
