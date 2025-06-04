import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-context";

function ProtectedLayout({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/iniciar-sesion" />;
  return children;
}

export default ProtectedLayout;
