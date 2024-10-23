import { Navigate } from "react-router-dom";
import { useStoreUser } from "../../store";

export const ProtectedRoute = ({ children }) => {
  const { token } = useStoreUser();
  const sessionToken = sessionStorage.getItem("token");

  return token || sessionToken ? children : <Navigate to="/" />;
};
