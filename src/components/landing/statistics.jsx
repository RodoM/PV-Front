import { motion } from "framer-motion";
import { Building2, ShoppingBag, Users, Clock } from "lucide-react";

export function Statistics() {
  const stats = [
    {
      icon: Building2,
      value: "10,000+",
      label: "Negocios activos",
      description: "Empresas confían en nuestro sistema",
    },
    {
      icon: ShoppingBag,
      value: "50M+",
      label: "Ventas procesadas",
      description: "Transacciones mensuales",
    },
    {
      icon: Users,
      value: "1M+",
      label: "Usuarios registrados",
      description: "Empleados utilizando la webapp",
    },
    {
      icon: Clock,
      value: "99.9%",
      label: "Tiempo de actividad",
      description: "Disponibilidad garantizada",
    },
  ];

  return (
    <section
      id="estadisticas"
      className="container mx-auto px-4 md:px-6 w-full py-12 md:py-24 lg:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center space-y-4 text-center"
      >
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
            Estadísticas
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Impacto en números
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Descubre el impacto que nuestra webapp POS tiene en miles de negocios en todo el país.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center justify-center space-y-2 rounded-lg border bg-background p-6 text-center shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="text-3xl font-bold"
            >
              {stat.value}
            </motion.div>
            <div className="text-sm font-medium">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.description}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
