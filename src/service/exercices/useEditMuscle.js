import { api } from "../api"; 
// EDITAR MUSCULO
export const useEditMuscle = async (idMuscle , form, grupoMuscularElegido) => {
    
  try {
    const response = await api.put(
      `/api/Musculo/ActualizarMusculo?id=${idMuscle}`,
      {
        nombre: form.name,
        descripcion: form.description,
        grupoMuscularId: grupoMuscularElegido.id,
        imagenMusculo: form.image,
        
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    console.log("Error al editar", error);
  }
};
