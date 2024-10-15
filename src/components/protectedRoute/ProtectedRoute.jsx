import { Navigate } from "react-router-dom";
import useStoreUser from "../../store/useStoreUser";

export const ProtectedRoute = ({ children }) => {
  const { token } = useStoreUser();

  return token ? children : <Navigate to="/" />;
};
