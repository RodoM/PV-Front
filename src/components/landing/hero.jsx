import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="container mx-auto px-4 md:px-6 w-full py-12 md:py-24 lg:py-32">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center space-y-4"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Todo lo que necesitás para vender, sin complicaciones.
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Gestiona productos, empleados, puntos de venta y más con nuestra webapp integral.
              Optimiza tus operaciones y aumenta tus ventas.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild size="lg" className="min-[400px]:mr-4">
              <a href="/registrarse">Registrar mi negocio</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/iniciar-sesion">Iniciar sesión</a>
            </Button>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <span className="font-medium">✓</span>
              <span className="text-muted-foreground">Configuración rápida</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">✓</span>
              <span className="text-muted-foreground">Soporte 24/7</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">✓</span>
              <span className="text-muted-foreground">Sin contratos</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <img src="src/assets/landing-example.png" alt="Ejemplo de aplicación" />
        </motion.div>
      </div>
    </section>
  );
}
