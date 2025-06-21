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

// ✅ Schema completo
const schema = z.object({
  email: z.string().email("El email es inválido"),
  password: z.string().nonempty("Contraseña es obligatoria"),
  nombre: z.string().nonempty("El nombre es obligatorio"),
  apellido: z.string().nonempty("El apellido es obligatorio"),
  tipoUsuario: z.string().nonempty("Tipo de usuario es obligatorio"),
  tipoDocumento: z.string().nonempty("Tipo de documento es obligatorio"),
  numeroDocumento: z.string().nonempty("Número de documento es obligatorio"),
  avatarUrl: z.string().url("Debe ser una URL válida").or(z.literal("")),
});

function EmployeeForm({ employee, closeModal }) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: employee?.email || "",
      password: employee?.password || "",
      nombre: employee?.nombre || "",
      apellido: employee?.apellido || "",
      tipoUsuario: employee?.tipoUsuario || "",
      tipoDocumento: employee?.tipoDocumento || "",
      numeroDocumento: employee?.numeroDocumento || "",
      avatarUrl: employee?.avatarUrl || "",
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
        {[
          { name: "email", label: "Email", type: "text", placeholder: "Email del empleado" },
          { name: "password", label: "Contraseña", type: "password" },
          { name: "nombre", label: "Nombre", type: "text", placeholder: "Nombre del empleado" },
          {
            name: "apellido",
            label: "Apellido",
            type: "text",
            placeholder: "Apellido del empleado",
          },
          { name: "tipoUsuario", label: "Tipo Usuario", type: "text", placeholder: "1, 2, 3" },
          {
            name: "tipoDocumento",
            label: "Tipo Documento",
            type: "text",
            placeholder: "1, 2, 3, 4",
          },
          { name: "numeroDocumento", label: "Numero Documento", type: "text" },
          { name: "avatarUrl", label: "Avatar URL", type: "text", placeholder: "https://..." },
        ].map(({ name, label, type, placeholder }) => (
          <FormField
            key={name}
            name={name}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input type={type} placeholder={placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

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
