import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  const faqs = [
    {
      question: "¿Qué hardware necesito para usar la webapp POS?",
      answer:
        "Nuestra webapp es compatible con la mayoría de los dispositivos modernos. Puedes usar computadoras con Windows o Mac, tablets Android o iPad, e incluso smartphones. Para impresión de tickets, es compatible con impresoras térmicas estándar. También ofrecemos paquetes de hardware completos si lo necesitas.",
    },
    {
      question: "¿Puedo probar la webapp antes de comprarla?",
      answer:
        "Sí, ofrecemos una prueba gratuita de 14 días con todas las funcionalidades del plan Premium. No se requiere tarjeta de crédito para comenzar la prueba y puedes cancelar en cualquier momento.",
    },
    {
      question: "¿Cómo es el proceso de implementación?",
      answer:
        "El proceso es muy sencillo. Una vez que te registras, puedes comenzar a configurar tu catálogo de productos, empleados y puntos de venta inmediatamente. Ofrecemos guías paso a paso y videos tutoriales. Para planes Premium y Empresarial, también ofrecemos asistencia personalizada en la configuración inicial.",
    },
    {
      question: "¿La webapp funciona sin conexión a internet?",
      answer:
        "Sí, nuestra webapp tiene un modo fuera de línea que permite seguir realizando ventas incluso sin conexión a internet. Una vez que la conexión se restablece, los datos se sincronizan automáticamente con la nube.",
    },
    {
      question: "¿Puedo integrar la webapp con mi tienda online?",
      answer:
        "Absolutamente. Ofrecemos integraciones nativas con las principales plataformas de e-commerce como WooCommerce, Shopify y Magento. Esto te permite gestionar tu inventario y ventas desde un único sistema, tanto para tu tienda física como online.",
    },
    {
      question: "¿Qué tipo de soporte técnico ofrecen?",
      answer:
        "Todos los planes incluyen soporte técnico por email. Los planes Premium y Empresarial incluyen soporte prioritario por chat y teléfono 24/7. Además, contamos con una extensa base de conocimientos, tutoriales en video y webinars regulares para ayudarte a aprovechar al máximo el sistema.",
    },
  ];

  return (
    <section id="faq" className="container mx-auto px-4 md:px-6 w-full py-12 md:py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center space-y-4 text-center"
      >
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
            Preguntas Frecuentes
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Respuestas a tus dudas
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Encuentra respuestas a las preguntas más comunes sobre nuestra webapp POS.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto max-w-3xl mt-12"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
