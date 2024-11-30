import { api } from "../api";

// TRAER EJERCICIOS
export const useGetAllPlansByUser = async (trainerId) => {

    
  try {
    const response = await api.get(
      `/api/PlanDeEntrenamiento/ObtenerPlanesDelUsuario?identityUser=${trainerId}`
    );

    
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
