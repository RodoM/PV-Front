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
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  descripcion: z.string().optional(),
  imagenUrl: z.string().optional(),
  ubicacion: z.string().optional(),
  stockActual: z.preprocess(
    (val) => Number(val),
    z.number().nonnegative("El stock debe ser mayor a cero")
  ),
  stockMinimo: z.preprocess(
    (val) => Number(val),
    z.number().nonnegative("El stock mínimo debe ser mayor a cero")
  ),
  stockMaximo: z.preprocess(
    (val) => Number(val),
    z.number().nonnegative("El stock máximo debe ser mayor a cero")
  ),
});

function UpdateProductForm({ product, closeModal }) {
  const { triggerRefresh } = useRefresh();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      descripcion: product?.descripcion || "",
      imagenUrl: product?.imagenUrl || "",
      ubicacion: product?.ubicacion || "",
      stockActual: product?.stockActual || 0,
      stockMinimo: product?.stockMinimo || 0,
      stockMaximo: product?.stockMaximo || 0,
    },
  });

  const onClose = () => {
    form.reset();
    closeModal();
  };

  const onSubmit = (data) => {
    setLoading(true);
    api
      .put("/productoNegocio/modify", data, {
        params: { productosNegocioId: product.productoNegocioId },
      })
      .then(() => {
        toast.success("Producto editado correctamente");
        triggerRefresh();
        closeModal();
        form.reset();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error al editar el producto");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="descripcion"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row items-start gap-4">
          <FormField
            name="imagenUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Imagen</FormLabel>
                <FormControl>
                  <Input placeholder="URL imagen del producto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="ubicacion"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Ubicación</FormLabel>
                <FormControl>
                  <Input placeholder="Ubicación del producto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4">
          <FormField
            name="stockActual"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Stock actual</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Stock" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="stockMinimo"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Stock mínimo</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Stock mínimo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="stockMaximo"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Stock máximo</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Stock máximo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

export default UpdateProductForm;
