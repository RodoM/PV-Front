import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Esta webapp POS transformó completamente la gestión de mi restaurante. Ahora puedo controlar el inventario, las ventas y el personal desde un solo lugar.",
      author: "María González",
      role: "Dueña de Restaurante",
      image: "https://avatar.iran.liara.run/public/80",
    },
    {
      quote:
        "La facilidad de uso y la capacidad de personalización son increíbles. Mis empleados aprendieron a usarla en minutos y ahora nuestras operaciones son mucho más eficientes.",
      author: "Carlos Rodríguez",
      role: "Gerente de Tienda Minorista",
      image: "https://avatar.iran.liara.run/public/6",
    },
    {
      quote:
        "El soporte técnico es excepcional. Siempre que he tenido alguna duda, me han ayudado de inmediato. Además, las actualizaciones constantes mejoran la webapp cada mes.",
      author: "Laura Martínez",
      role: "Propietaria de Farmacia",
      image: "https://avatar.iran.liara.run/public/62",
    },
    {
      quote:
        "Gracias a los informes detallados, he podido identificar tendencias de ventas y optimizar mi inventario. Mi rentabilidad ha aumentado un 30% desde que implementamos este sistema.",
      author: "Javier Pérez",
      role: "Dueño de Supermercado",
      image: "https://avatar.iran.liara.run/public/49",
    },
    {
      quote:
        "La integración con mi tienda online fue perfecta. Ahora tengo un control unificado de mis ventas físicas y digitales, lo que ha simplificado enormemente mi contabilidad.",
      author: "Ana López",
      role: "Emprendedora E-commerce",
      image: "https://avatar.iran.liara.run/public/67",
    },
  ];

  return (
    <section
      id="testimonios"
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
            Testimonios
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Descubre cómo nuestra webapp POS ha ayudado a miles de negocios a optimizar sus
            operaciones y aumentar sus ventas.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-12"
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="h-full">
                  <CardContent className="flex flex-col justify-between p-6 h-full">
                    <div className="mb-4">
                      <p className="text-sm italic text-muted-foreground">"{testimonial.quote}"</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="rounded-full overflow-hidden h-10 w-10">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.author}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </section>
  );
}
