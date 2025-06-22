import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PublicLayout from "./layouts/public-layout";
import ProtectedLayout from "./layouts/protected-layout";
import DashboardLayout from "./layouts/dashboard-layout";
import Landing from "./pages/landing";
import Resume from "./pages/dashboard/resume";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import Products from "./pages/dashboard/products";
import Sales from "./pages/dashboard/sales";
import SalesStalls from "./pages/dashboard/sales-stalls";
import Settings from "./pages/dashboard/settings";
import Profile from "./pages/dashboard/profile";
import SalesStall from "./pages/employee-dashboard/sales-stall";
import NotFound from "./pages/not-found";
import EmployeeDashboard from "./pages/employee-dashboard/sales-stalls";
import Employees from "./pages/dashboard/employees";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      name: "Inicio",
      element: <Landing />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedLayout>
          <DashboardLayout />
        </ProtectedLayout>
      ),
      children: [
        {
          path: "resumen",
          name: "Resumen",
          element: <Resume />,
        },
        {
          path: "productos",
          name: "Productos",
          element: <Products />,
        },
        {
          path: "empleados",
          name: "Empleados",
          element: <Employees />,
        },
        {
          path: "ventas",
          name: "Ventas",
          element: <Sales />,
        },
        {
          path: "puestos",
          name: "Puestos de Venta",
          element: <SalesStalls />,
        },
        {
          path: "configuraciones",
          name: "Configuraciones",
          element: <Settings />,
        },
        {
          path: "perfil",
          name: "Perfil",
          element: <Profile />,
        },
        {
          path: "*",
          name: "No Encontrado",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/puestos",
      name: "Puesto",
      element: (
        <ProtectedLayout>
          <EmployeeDashboard />
        </ProtectedLayout>
      ),
    },
    {
      path: "/puestos/:id",
      name: "Puesto",
      element: (
        <ProtectedLayout>
          <SalesStall />
        </ProtectedLayout>
      ),
    },
    {
      path: "/iniciar-sesion",
      name: "Iniciar Sesión",
      element: (
        <PublicLayout>
          <SignIn />
        </PublicLayout>
      ),
    },
    {
      path: "/registrarse",
      name: "Registrarse",
      element: (
        <PublicLayout>
          <SignUp />
        </PublicLayout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
