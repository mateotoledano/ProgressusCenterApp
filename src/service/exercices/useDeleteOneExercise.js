import { api } from "../api";

// DELETE EJERCICIO
export const useDeleteOneExercise = async (idExercise) => {
  try {
    const response = await api.delete(
      `/api/Ejercicio/EliminarEjercicio?id=${idExercise}`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
