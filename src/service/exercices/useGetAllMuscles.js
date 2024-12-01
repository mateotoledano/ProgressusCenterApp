
import { api } from "../api";

// TRAER TODOS LOS MUSCULOS
export const useGetAllMuscles = async () => {
  try {
    const response = await api.get(
      `/api/Musculo/ObtenerTodosLosMusculos`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
