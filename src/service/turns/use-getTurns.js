import axios from "axios";
import { api } from "../api";

// TRAER LA DATA DEL USUARIO
export const useGetTurns = async (idUser) => {
  try {
    const response = await api.get(`/api/ReservasTurnos/usuario/${idUser}`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
