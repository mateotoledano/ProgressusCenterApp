import { api } from "../api";

// TRAER INVENTARIO
export const useGetInventary = async () => {
  try {
    const response = await api.get(`/api/Inventario/ObtenerTodos`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
