import { api } from "../api";

// TRAER Todas las membresias de un socio
export const useGetAllMembershipForSocio = async (idUser) => {
  try {
    const response = await api.get(`/api/SolicitudDePago/ObtenerTodasLasSolicitudesDeUnSocio?identityUserId=${idUser}`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
