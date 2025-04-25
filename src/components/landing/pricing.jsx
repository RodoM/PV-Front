import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

export function Pricing() {
  const plans = [
    {
      name: "Básico",
      description: "Ideal para pequeños negocios que están comenzando",
      price: "ARS 15.000",
      billing: "por mes",
      features: [
        "1 punto de venta",
        "Hasta 500 productos",
        "2 usuarios",
        "Reportes básicos",
        "Soporte por email",
        "Actualizaciones incluidas",
      ],
      cta: "Comenzar gratis",
      ctaLink: "#registro",
      popular: false,
    },
    {
      name: "Premium",
      description: "Para negocios con múltiples puntos de venta",
      price: "ARS 29.000",
      billing: "por mes",
      features: [
        "Hasta 5 puntos de venta",
        "Productos ilimitados",
        "10 usuarios",
        "Reportes avanzados",
        "Soporte prioritario 24/7",
        "Módulo de fidelización de clientes",
        "Personalización avanzada",
      ],
      cta: "Comenzar ahora",
      ctaLink: "#registro",
      popular: true,
    },
    {
      name: "Empresarial",
      description: "Solución completa para cadenas y franquicias",
      price: "Personalizado",
      billing: "contacta para precio",
      features: [
        "Puntos de venta ilimitados",
        "Productos ilimitados",
        "Usuarios ilimitados",
        "Business Intelligence",
        "API completa",
        "Soporte dedicado",
        "Implementación personalizada",
        "Capacitación para equipos",
      ],
      cta: "Contactar ventas",
      ctaLink: "#contacto",
      popular: false,
    },
  ];

  return (
    <section id="precios" className="container mx-auto px-4 md:px-6 w-full py-12 md:py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center space-y-4 text-center"
      >
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
            Precios
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Planes simples y transparentes
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Elige el plan que mejor se adapte a las necesidades de tu negocio. Todos incluyen
            actualizaciones gratuitas.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className={`h-full flex flex-col ${plan.popular ? "relative border-primary shadow-lg" : ""}`}
            >
              {plan.popular && (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-0 -translate-y-3">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-md">
                    Más popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.billing}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                  <a href={plan.ctaLink}>{plan.cta}</a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
