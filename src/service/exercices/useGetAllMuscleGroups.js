import { api } from "../api";

// TRAER TODOS LOS GRUPOS MUSCULARES
export const useGetAllMuscleGroups = async () => {
  try {
    const response = await api.get(
      `/api/GrupoMuscular/ObtenerTodosLosGruposMusculares`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
