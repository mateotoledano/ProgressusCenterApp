import { api } from "../api"; 

export const useEditGroup= async (idGrupo , form) => {
  try {
    const response = await api.put(
      `/api/GrupoMuscular/ActualizarGrupoMuscular?id=${idGrupo}`,
      {
        nombre: form.name,
        descripcion: form.description,
        imagenGrupoMuscular: form.image,
        
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
