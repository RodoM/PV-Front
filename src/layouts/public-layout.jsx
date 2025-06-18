import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/auth-context";

function PublicLayout({ children }) {
  const { user } = useAuth();

  if (!!user && user.negocioId) return <Navigate to="/dashboard/resumen" />;
  return children;
}

export default PublicLayout;
