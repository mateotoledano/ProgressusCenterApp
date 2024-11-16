import { api } from "../api";
// Login usuario
export const loginUser = async (email, password) => {
  try {
    const response = await api.post(
      `/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    
    return response
  } catch (error) {
    console.error("Error al registrar usuario:", error.response.data.errors);

    return error;
  }
};
