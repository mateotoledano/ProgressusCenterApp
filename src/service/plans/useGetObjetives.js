

import { api } from "../api";

// TRAER TODOS LOS OBJETIVOS
export const useGetObjetives = async () => {
  try {
    const response = await api.get(`/api/ObjetivoDePlan/ObtenerTodosLosObjetivos`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
