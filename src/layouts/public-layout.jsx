import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-context";

function PublicLayout({ children }) {
  const { isAuthenticated } = useAuth();
  const negocioAsignado = false;

  if (isAuthenticated && negocioAsignado) return <Navigate to="/dashboard/resumen" />;
  return children;
}

export default PublicLayout;
