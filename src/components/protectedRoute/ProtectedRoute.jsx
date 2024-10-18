import { Navigate } from "react-router-dom";
import { useStoreUser } from "../../store";

export const ProtectedRoute = ({ children }) => {
  const { token } = useStoreUser();

  return token ? children : <Navigate to="/" />;
};
