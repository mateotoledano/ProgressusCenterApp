import { api } from "../api";

// DELETE ITEM
export const useDeleteItem = async (idItem) => {
  try {
    const response = await api.delete(`/api/Inventario/Eliminar/${idItem}`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
