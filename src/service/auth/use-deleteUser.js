import { api } from "../api";

// DELETE USER
export const useDeleteUser = async (idUser) => {
  try {
    const response = await api.delete(`/api/Auth/usuario/${idUser}`);
    console.log(response , "resp del delete");
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
