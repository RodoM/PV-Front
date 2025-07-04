import { useState, useRef } from "react";
import api from "@/lib/axios";
import { LoaderCircle } from "lucide-react";
import Step2 from "@/components/auth/steps/step-2";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useBusiness } from "@/providers/business-context";

function Settings() {
  const { business, setBusiness } = useBusiness();
  const step2Ref = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const data = await step2Ref.current?.validate();
    if (!data) return;

    try {
      setLoading(true);
      await api.put("/business/modify", { ...data, negocioId: business.id });
      setBusiness({ ...data, id: business.id });
      toast.success("Datos actualizados exitosamente");
    } catch (error) {
      const message = error.response?.data?.message || "Error al actualizar los datos";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!business)
    return (
      <div className="flex h-full items-center justify-center">
        <LoaderCircle className="w-5 h-5 animate-spin" />
      </div>
    );

  return (
    <div>
      <Step2 ref={step2Ref} defaultValues={business} />
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 mt-4">
        <Button className="w-full md:w-fit md:ml-auto" onClick={handleSubmit} disabled={loading}>
          {loading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
          Actualizar datos
        </Button>
      </div>
    </div>
  );
}

export default Settings;
