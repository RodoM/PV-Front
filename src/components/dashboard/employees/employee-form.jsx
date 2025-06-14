import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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

const schema = z.object({
  name: z.string().nonempty("El nombre es obligatorio"),
  dni: z.string().regex(/^\d{7,8}$/, "DNI inválido"),
  position: z.string().nonempty("El puesto es obligatorio"),
});

function EmployeeForm({ employee, closeModal }) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: employee?.name || "",
      dni: employee?.dni || "",
      position: employee?.position || "",
    },
  });

  const onSubmit = (data) => {
    console.log("Empleado:", data);
    setLoading(true);
    setTimeout(() => {
      toast.success(`Empleado ${employee ? "actualizado" : "agregado"} correctamente`);
      setLoading(false);
      form.reset();
      closeModal();
    }, 2000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del empleado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="dni"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>DNI</FormLabel>
              <FormControl>
                <Input placeholder="DNI" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="position"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Puesto</FormLabel>
              <FormControl>
                <Input placeholder="Puesto de trabajo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={closeModal}>
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

export default EmployeeForm;
