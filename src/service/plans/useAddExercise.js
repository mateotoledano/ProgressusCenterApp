import { api } from "../api";

// TRAER PLANES PLANTILLAS
export const useAddExercise = async (form, idPlan, diaPlan) => {
  console.log(form , idPlan , diaPlan , "socio idddd");
  
  try {
    const response = await api.post(
      `/api/PlanDeEntrenamiento/AgregarEjercicioAPlan`,
      {
        planId: idPlan,
        diaDePlan: diaPlan,
        ejercicioId: form.ejercicioId,
        series: form.series,
        repes: form.repeticiones,
        orden: form.ordenDelEjercicio,
      }
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
