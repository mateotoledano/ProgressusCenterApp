// export const registerUser = async (email, password) => {
//   try {
//     const response = await fetch('https://localhost:44329/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json', // Especifica que estás enviando JSON
//       },
//       credentials: 'include', // Incluye las credenciales si es necesario
//       body: JSON.stringify({
//         email: email,
//         password: password,
//       }),
//     });

//     // Verifica si la respuesta es exitosa
//     if (!response.ok) {
//       throw new Error(`Error en la solicitud: ${response.status}`);
//     }

//     // Convierte la respuesta a JSON
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error al registrar usuario:', error);
//     throw error;
//   }
// };



import { api } from "../api";
// Registrar usuario
export const registerUser = async (email, password) => {
  try {
    const response = await api.post(
      `/register`,
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true, // Incluye las credenciales si es necesario
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};
