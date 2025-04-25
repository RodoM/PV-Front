import { motion } from "framer-motion";

export function Team() {
  const frontendTeam = [
    {
      name: "Rodolfo Meroi",
      username: "RodoM",
      avatar: "https://avatars.githubusercontent.com/u/87952837?v=4",
    },
    {
      name: "Candela Burgos",
      username: "Candela-Burgos",
      avatar: "https://avatars.githubusercontent.com/u/90358734?v=4",
    },
    {
      name: "Emanuel Camacho",
      username: "Emanuel-Camacho",
      avatar: "https://avatars.githubusercontent.com/u/128238454?v=4",
    },
    {
      name: "Keila Pagano",
      username: "KeilaPagano",
      avatar: "https://avatars.githubusercontent.com/u/150390508?v=4",
    },
  ];

  const backendTeam = [
    {
      name: "Jenson Medina",
      username: "JensonMedina",
      avatar: "https://avatars.githubusercontent.com/u/124718587?v=4",
    },
    {
      name: "Valentin Lanfranco",
      username: "ValeLan",
      avatar: "https://avatars.githubusercontent.com/u/95455283?v=4",
    },
    {
      name: "Bruno Rubini",
      username: "BrunoRubini",
      avatar: "https://avatars.githubusercontent.com/u/141842002?v=4",
    },
    {
      name: "Mateo Regis",
      username: "MateoRegis",
      avatar: "https://avatars.githubusercontent.com/u/132944701?v=4",
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
      id="nosotros"
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
            Nosotros
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Conoce a nuestro equipo
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Profesionales apasionados que trabajan para ofrecerte la mejor experiencia en nuestra
            webapp POS.
          </p>
        </div>
      </motion.div>

      <div className="mt-12 space-y-12">
        {/* Frontend Team */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold mb-6 text-center md:text-left"
          >
            Equipo Frontend
          </motion.h3>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8 md:grid-cols-4 border-t pt-6"
          >
            {frontendTeam.map((member, index) => (
              <motion.div key={index} variants={item} className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-background size-20 md:size-24 rounded-full border p-0.5 shadow overflow-hidden"
                >
                  <img
                    className="aspect-square rounded-full object-cover"
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    height="460"
                    width="460"
                    loading="lazy"
                  />
                </motion.div>
                <span className="mt-3 block text-sm font-medium">{member.name}</span>
                <span className="text-muted-foreground block text-xs">{member.username}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Backend Team */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold mb-6 text-center md:text-left"
          >
            Equipo Backend
          </motion.h3>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8 md:grid-cols-4 border-t pt-6"
          >
            {backendTeam.map((member, index) => (
              <motion.div key={index} variants={item} className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-background size-20 md:size-24 rounded-full border p-0.5 shadow overflow-hidden"
                >
                  <img
                    className="aspect-square rounded-full object-cover"
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    height="460"
                    width="460"
                    loading="lazy"
                  />
                </motion.div>
                <span className="mt-3 block text-sm font-medium">{member.name}</span>
                <span className="text-muted-foreground block text-xs">{member.username}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
