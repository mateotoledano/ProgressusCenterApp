
import { api } from "../api";

// TRAER TODOS LOS USUARIOS
export const useGetAllUsers = async () => {
  try {
    const response = await api.get(
      `/api/Auth/usuarios`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
