import { Navigate, useNavigate } from "react-router-dom";
import { useStoreUser, useStoreUserData } from "../../store";
import { useEffect } from "react";

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = useStoreUser((state) => state.token); // Obtenemos el token del estado de Zustand
  const userData = useStoreUserData((state) => state.userData); // Datos del usuario desde Zustand
  const navigate = useNavigate();

  // Si no hay token en Zustand, lo buscamos manualmente en localStorage o sessionStorage
  const localToken = localStorage.getItem("auth-token");
  const sessionToken = sessionStorage.getItem("auth-token");

  // Verificar roles permitidos
  const userRoles = userData?.roles[0] || [];
  const hasPermission = allowedRoles.includes(userRoles);

  // Redirigir si no tiene permiso
  useEffect(() => {
    if (!hasPermission) {
      navigate("/home");
    }
  }, [hasPermission, navigate]);

  // Si existe token en Zustand o en cualquiera de los almacenamientos, permitimos el acceso
  return token || localToken || sessionToken ? children : <Navigate to="/" />;
};
