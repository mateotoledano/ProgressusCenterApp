import { api } from "../api";

// TRAER PLANES PLANTILLAS
export const useGetPlantillas = async () => {
  try {
    const response = await api.get(
      `/api/PlanDeEntrenamiento/ObtenerPlanesPlantillas`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
