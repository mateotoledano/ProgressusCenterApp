import { api } from "../api"; // Asegúrate de que la ruta sea correcta

export const useCreateMuscle = async (form, grupoMuscularElegido ) => {
  console.log(form, "form");

  try {
    const response = await api.post(
      `/api/Musculo/CrearMusculo`,
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
    console.error(
      "Error al enviar la reserva:",
      error.response?.data?.errors || error.message
    );
    return error.response?.data?.errors || error.message;
  }
};
