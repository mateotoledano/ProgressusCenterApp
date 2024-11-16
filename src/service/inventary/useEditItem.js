import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useEditItem = async (nombre, descripcion, estado, idItem) => {
  try {
    const response = await api.put(
      `/api/Inventario/Editar/${idItem}`,
      {
        nombre: nombre,
        descripcion: descripcion,
        estado: estado,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error al crear el item", error);
  }
};
