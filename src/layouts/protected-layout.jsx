import { Navigate, useLocation, useMatch } from "react-router-dom";
import { useAuth } from "@/providers/auth-context";
import { useBusiness } from "@/providers/business-context";

function ProtectedLayout({ children }) {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { cashbox } = useBusiness();

  // Ruta dinámica: /puestos/:id
  const isPuestoDetalle = useMatch("/puestos/:id");

  // 1. No autenticado
  if (!isAuthenticated) {
    return <Navigate to="/iniciar-sesion" />;
  }

  // 2. Si es Seller, permitir sólo /puestos o /puestos/:id
  if (user?.role === "Seller" && !(location.pathname === "/puestos" || isPuestoDetalle)) {
    return <Navigate to="/puestos" replace />;
  }

  // 3. Si la caja está cerrada, bloquear acceso a /puestos/:id (para todos los roles)
  if (cashbox?.estaCerrada && isPuestoDetalle) {
    return <Navigate to="/puestos" replace />;
  }

  // 4. Todo ok
  return children;
}

export default ProtectedLayout;
