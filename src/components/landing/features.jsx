import { BarChart3, ShoppingCart, Users, FileText, LayoutDashboard, Truck } from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      icon: ShoppingCart,
      title: "Control de Inventario",
      description:
        "Gestiona tu stock en tiempo real, recibe alertas de productos con bajo inventario y realiza seguimiento de movimientos.",
    },
    {
      icon: LayoutDashboard,
      title: "Dashboard Personalizable",
      description:
        "Configura tu panel de control según tus necesidades, visualiza métricas clave y toma decisiones informadas.",
    },
    {
      icon: FileText,
      title: "Generación de Facturas",
      description:
        "Crea facturas profesionales con tu marca, envíalas por email y mantén un registro completo de todas las transacciones.",
    },
    {
      icon: Users,
      title: "Gestión de Empleados",
      description:
        "Administra permisos, turnos y rendimiento de tus empleados desde una interfaz centralizada.",
    },
    {
      icon: BarChart3,
      title: "Reportes Avanzados",
      description:
        "Accede a informes detallados sobre ventas, productos más vendidos, horas pico y comportamiento de clientes.",
    },
    {
      icon: Truck,
      title: "Gestión de Proveedores",
      description:
        "Mantén una base de datos de proveedores, realiza pedidos y gestiona entregas desde el sistema.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="caracteristicas"
      className="container mx-auto px-4 md:px-6 w-full py-12 md:py-24 lg:py-32"
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
            Características
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Todo lo que necesitas para gestionar tu negocio
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Nuestra webapp POS ofrece herramientas completas para optimizar tus operaciones y
            potenciar el crecimiento de tu negocio.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 bg-background shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
