import { api } from "../api";
// CREAR EJERCICIO
export const useCreateExercise = async (form) => {
  console.log(form, "form");

  try {
    const response = await api.post(
      `/api/Ejercicio/CrearEjercicio`,
      {
        nombre: form.nombre,
        descripcion: form.descripcion,
        imagenMaquina: form.imagenMaquina,
        videoEjercicio: form.videoEjercicio,
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

// Actualizar músculos asociados a un ejercicio
export const useAddMuscleToExercise = async (musculos, ejercicioId) => {
  try {
    const musculosIds = musculos.map((musculo) => musculo.id);
    console.log(musculos, "musculos en el put");

    const response = await api.put(
      `/api/Ejercicio/ActualizarMusculosDeEjercicio`,
      {
        ejercicioId: ejercicioId,
        musculosIds: musculos.length === 0 ? musculos[0].id : musculosIds,
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
      "Error al actualizar los músculos del ejercicio:",
      error.response?.data?.errors || error.message
    );
    return error.response?.data?.errors || error.message;
  }
};

// EDITAR EJERCICIO
export const useEditExercise = async (idExercise, form) => {
  console.log(form, idExercise ,  "form edit");

  try {
    const response = await api.put(
      `/api/Ejercicio/ActualizarEjercicio?id=${idExercise}`,
      {
        nombre: form.nombre,
        descripcion: form.descripcion,
        imagenMaquina: form.imagenMaquina,
        videoEjercicio: form.videoEjercicio,
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
