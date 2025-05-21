import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard-layout";
import Landing from "./pages/landing";
import Resume from "./pages/dashboard/resume";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import Products from "./pages/dashboard/products";
import Sales from "./pages/dashboard/sales";
import SalesStalls from "./pages/dashboard/sales-stalls";
import Settings from "./pages/dashboard/settings";
import SalesStall from "./pages/sales-stall";
import NotFound from "./pages/not-found";
import EmployeeDashboard from "./pages/employee-dashboard/sales-stalls";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      name: "Inicio",
      element: <Landing />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
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
          path: "*",
          name: "No Encontrado",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/puestos",
      name: "Puesto",
      element: <EmployeeDashboard />,
    },
    {
      path: "/puestos/:id",
      name: "Puesto",
      element: <SalesStall />,
    },
    {
      path: "/iniciar-sesion",
      name: "Iniciar Sesión",
      element: <SignIn />,
    },
    {
      path: "/registrarse",
      name: "Registrarse",
      element: <SignUp />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
