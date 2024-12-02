import { api } from "../api";

// DELETE Grupo muscular
export const useDeleteGroup= async (idGroup) => {
  try {
    const response = await api.delete(`/api/GrupoMuscular/EliminarGrupoMuscular?id=${idGroup}`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
