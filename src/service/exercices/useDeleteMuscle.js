import { api } from "../api";

// DELETE Muscle
export const useDeleteMuscle = async (idGroup) => {
  try {
    const response = await api.delete(
      `/api/Musculo/EliminarMusculo?id=${idGroup}`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
