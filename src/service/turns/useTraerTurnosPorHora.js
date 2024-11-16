import axios from "axios";
import { api } from "../api";

// TRAER LA DATA DEPENDIENDO EL HORARIO
export const useTraerTurnosPorHora = async (fecha , horaInicio) => {
  try {
    const response = await api.get(`/api/ReservasTurnos/ObtenerReservasPorHorario?fecha=${fecha}&horainicio=${horaInicio}`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
