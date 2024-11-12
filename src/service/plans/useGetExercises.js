import { api } from "../api";

// TRAER EJERCICIOS
export const useGetAllExercises = async () => {
  try {
    const response = await api.get(`/api/Ejercicio/ObtenerTodosLosEjercicios`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
