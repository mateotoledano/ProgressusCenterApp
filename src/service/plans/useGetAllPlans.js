import { api } from "../api";

// TRAER EJERCICIOS
export const useGetAllPlans = async () => {
  try {
    const response = await api.get(`/api/PlanDeEntrenamiento/ObtenerTodosLosPlanes`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
