import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useCreateItem = async (nombre, descripcion, estado) => {
  try {
    const response = await api.post(
      `/api/Inventario/Crear`,
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
