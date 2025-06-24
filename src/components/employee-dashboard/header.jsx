import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useTheme } from "@/providers/theme-provider";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/providers/auth-context";
import { useBusiness } from "@/providers/business-context";
import { Shell, Menu, Sun, Moon, X } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

export function Header() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { removeToken, user } = useAuth();
  const { business, setBusiness } = useBusiness();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    api
      .get("/business/data")
      .then((response) => {
        const { data } = response.data;
        setBusiness(data);
      })
      .catch(() => {
        toast.error("Error al cargar los datos del negocio");
      });
  }, [setBusiness]);

  const handleLogOut = () => {
    removeToken();
    setBusiness(null);
    navigate("/iniciar-sesion");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="bg-primary p-1 rounded-md">
            <Shell className="h-4 w-4 text-white dark:text-black" />
          </div>
          {business?.nombre}
        </div>

        <nav className="hidden md:flex gap-4 ml-auto">
          {user.role !== "Seller" && (
            <Button>
              <Link to="/dashboard/ventas">Volver al dashboard</Link>
            </Button>
          )}
          <Button variant="outline" onClick={handleLogOut}>
            Cerrar sesión
          </Button>
          <Button variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </nav>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden p-4">
          <nav className="flex flex-col gap-4">
            {user.role !== "Seller" && (
              <Button>
                <Link to="/dashboard/ventas">Volver al dashboard</Link>
              </Button>
            )}
            <Button variant="outline" onClick={handleLogOut}>
              Cerrar sesión
            </Button>
            <Button variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
