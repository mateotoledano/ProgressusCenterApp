import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useCreateGruopMuscle = async (form) => {
  console.log(form, "form");

  try {
    const response = await api.post(
      `/api/GrupoMuscular/CrearGrupoMuscular`,
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
    console.error(
      "Error al enviar la reserva:",
      error.response?.data?.errors || error.message
    );
    return error.response?.data?.errors || error.message;
  }
};
