import { PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";

function Step3({ email }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4">
      <PartyPopper size={64} />
      <p className="text-xl font-bold">Registro exitoso</p>
      <p>
        ¡Felicitaciones! Hemos enviado un correo de confirmación a{" "}
        <span className="font-bold">{email}</span>. Ya puedes acceder a tu cuenta y comenzar a
        utilizar nuestros servicios.
      </p>
      <Button>
        <a href="/">Volver al inicio</a>
      </Button>
    </div>
  );
}

export default Step3;
