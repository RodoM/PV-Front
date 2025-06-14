import { useState } from "react";
import { Menu, Shell, X } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Función para manejar el scroll suave
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Cerrar el menú móvil si está abierto
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }

      // Scroll suave hacia el elemento
      targetElement.scrollIntoView({ behavior: "smooth" });

      // Actualizar la URL sin recargar la página
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  // Lista de enlaces de navegación para mantener el código DRY
  const navLinks = [
    { href: "caracteristicas", label: "Características", delay: 0.1 },
    { href: "estadisticas", label: "Estadísticas", delay: 0.2 },
    { href: "testimonios", label: "Testimonios", delay: 0.3 },
    { href: "nosotros", label: "Nosotros", delay: 0.4 },
    { href: "precios", label: "Precios", delay: 0.5 },
    { href: "faq", label: "FAQ", delay: 0.6 },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 font-bold text-xl"
        >
          <div className="bg-primary p-1 rounded-md">
            <Shell className="h-4 w-4 text-white dark:text-black" />
          </div>
          Sistema PV
        </motion.div>

        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: link.delay }}
            >
              <a
                href={`#${link.href}`}
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={(e) => handleSmoothScroll(e, link.href)}
              >
                {link.label}
              </a>
            </motion.div>
          ))}
        </nav>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden p-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={`#${link.href}`}
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={(e) => handleSmoothScroll(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
