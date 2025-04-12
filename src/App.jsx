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

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "resumen",
          element: <Resume />,
        },
        {
          path: "productos",
          element: <Products />,
        },
        {
          path: "ventas",
          element: <Sales />,
        },
        {
          path: "puestos",
          element: <SalesStalls />,
        },
        {
          path: "configuraciones",
          element: <Settings />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/puestos/:id",
      element: <SalesStall />,
    },
    {
      path: "/iniciar-sesion",
      element: <SignIn />,
    },
    {
      path: "/registrarse",
      element: <SignUp />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;