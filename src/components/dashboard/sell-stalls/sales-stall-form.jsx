import { useState } from "react";
import api from "@/lib/axios";
import { useRefresh } from "@/providers/refresh-context";
import { useAuth } from "@/providers/auth-context";
import { LoaderCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  nombre: z.string().nonempty("El nombre es obligatorio"),
});

function SalesStandForm({ salesStand, closeModal }) {
  const { triggerRefresh } = useRefresh();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: salesStand?.nombre || "",
    },
  });

  const onClose = () => {
    form.reset();
    closeModal();
  };

  const onSubmit = (data) => {
    if (salesStand) {
      api
        .put(
          "/terminal/modify",
          { ...data, negocioId: user.negocioId },
          { params: { puestoId: salesStand.id } }
        )
        .then(() => {
          toast.success("Puesto agregado correctamente");
          triggerRefresh();
          closeModal();
          form.reset();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error al agregar el Puesto");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      api
        .post("/terminal/register", { ...data, negocioId: user.negocioId })
        .then(() => {
          toast.success("Puesto agregado correctamente");
          triggerRefresh();
          closeModal();
          form.reset();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error al agregar el Puesto");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Nombre */}
        <FormField
          name="nombre"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del puesto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
            Confirmar
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default SalesStandForm;
