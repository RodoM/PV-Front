import { useState } from "react";
import api from "@/lib/axios";
import { useRefresh } from "@/providers/refresh-context";
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
  productoNegocioId: z.number(),
  valor: z.preprocess((val) => Number(val), z.number().min(1, "El precio debe ser mayor a cero")),
});

function PriceForm({ productoNegocioId, closeModal }) {
  const { triggerRefresh } = useRefresh();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      productoNegocioId: productoNegocioId,
      valor: 0,
    },
  });

  const onClose = () => {
    form.reset();
    closeModal();
  };

  const onSubmit = (data) => {
    setLoading(true);
    api
      .post("/price/register", data)
      .then(() => {
        toast.success("Precio cargado correctamente");
        triggerRefresh();
        onClose();
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Error al cargar el precio";
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="valor"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ingrese el nuevo precio de producto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
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

export default PriceForm;
