import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Cta() {
  return (
    <section
      id="registro"
      className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Comienza a optimizar tu negocio hoy mismo
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Únete a miles de negocios que ya están aprovechando nuestra webapp POS para aumentar
              sus ventas y simplificar sus operaciones.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild size="lg" variant="secondary" className="min-[400px]:mr-4">
              <a href="/registrarse">Registrar mi negocio</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <a href="/iniciar-sesión">Iniciar sesión</a>
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/80">Prueba gratuita por 30 días.</p>
        </motion.div>
      </div>
    </section>
  );
}
