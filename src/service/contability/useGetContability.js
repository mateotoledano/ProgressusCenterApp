import { api } from "../api";

// TRAER CONTABILIDAD
export const useGetContability = async () => {
  try {
    const response = await api.get(`/api/SolicitudDePago/pagos-efectivo-Usuario`);
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
