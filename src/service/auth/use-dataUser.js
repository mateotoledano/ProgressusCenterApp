import axios from "axios";

// TRAER LA DATA DEL USUARIO
export const useDataUser = async (email) => {
  try {
    const response = await axios.get(
      `https://localhost:7140/api/Auth/ObtenerDatosDelUsuario?email=${email}`
    );
    return response;
  } catch (e) {
    console.log(e, "errores");
  }
};
