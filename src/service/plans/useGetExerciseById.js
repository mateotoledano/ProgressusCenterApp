import { api } from "../api";

// TRAER EJERCICIOS POR ID
export const useGetExerciseById = async (idExercise) => {
  try {
    const response = await api.get(
      `/api/Ejercicio/ObtenerEjercicioPorId?id=${idExercise}`
    );

    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
