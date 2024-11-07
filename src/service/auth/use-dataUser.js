
import { api } from "../api";

// TRAER LA DATA DEL USUARIO
export const useDataUser = async (email) => {
  try {
    const response = await api.get(
      `/api/Auth/ObtenerDatosDelUsuario?email=${email}`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
