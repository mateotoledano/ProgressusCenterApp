import { api } from "../api";

// TRAER ASITENCIAS DEL USUARIO
export const useAsistProfile = async (idUser) => {
    console.log(idUser , "prop");
    
  try {
    const response = await api.get(
      `/api/ReservasTurnos/ObtenerAsistenciasPorUsuario/${idUser}`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
