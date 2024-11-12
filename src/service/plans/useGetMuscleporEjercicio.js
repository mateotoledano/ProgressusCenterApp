import { api } from "../api";

// TRAER EJERCICIOS
export const useGetMuscleporEjercicio = async (idMuscle) => {
  try {
    const response = await api.get(`/api/Musculo/ObtenerMusculoPorId?musculoId=${idMuscle}`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
