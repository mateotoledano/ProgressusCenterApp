import { Navigate } from "react-router-dom";
import useStoreUser from "../../store/useStoreUser"; // Asegúrate de importar tu store

export const ProtectedRoute = ({ children }) => {
  const { user } = useStoreUser();

  return user ? children : <Navigate to="/" />;
};
