import { Navigate } from "react-router-dom";
import { useStoreUser } from "../../store"; // Usamos un solo store

export const ProtectedRoute = ({ children }) => {
  const token = useStoreUser((state) => state.token); // Obtenemos el token del estado de Zustand

  // Si no hay token en Zustand, lo buscamos manualmente en localStorage o sessionStorage
  const localToken = localStorage.getItem("auth-token");
  const sessionToken = sessionStorage.getItem("auth-token");

  // Si existe token en Zustand o en cualquiera de los almacenamientos, permitimos el acceso
  return token || localToken || sessionToken ? children : <Navigate to="/" />;
};
