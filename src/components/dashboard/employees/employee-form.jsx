import { useState } from "react";
import api from "@/lib/axios";
import { useRefresh } from "@/providers/refresh-context";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const schema = z.object({
  email: z.string().email("Email no válido"),
  password: z
    .string()
    .nonempty("Contraseña es obligatoria")
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .refine((val) => /(?=.*\d)(?=.*[A-Z])/.test(val), {
      message: "La contraseña debe incluir al menos un número y una letra mayúscula",
    }),
  nombre: z.string().nonempty("El nombre es obligatorio"),
  apellido: z.string().nonempty("El apellido es obligatorio"),
  tipoUsuario: z.coerce.number().int({ message: "Debe ser un número entero" }),
  tipoDocumento: z.number({
    required_error: "Tipo de documento es obligatorio",
  }),
  numeroDocumento: z.string().nonempty("Número de documento es obligatorio"),
  imagenUrl: z.string().optional(),
});

function EmployeeForm({ employee, closeModal }) {
  const [loading, setLoading] = useState(false);
  const { triggerRefresh } = useRefresh();

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
    console.log(data);
    if (employee) {
      api
        .put("/user/modify", { ...data })
        .then(() => {
          toast.success("Empleado agregado correctamente");
          triggerRefresh();
          closeModal();
          form.reset();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error al modificar el Empleado");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      api
        .post("/user/register", { ...data })
        .then(() => {
          toast.success("Empleado agregado correctamente");
          triggerRefresh();
          closeModal();
          form.reset();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error al agregar el Empleado");
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
          // { name: "tipoUsuario", label: "Tipo Usuario", type: "number", placeholder: "1, 2" },
          {
            name: "tipoDocumento",
            label: "Tipo Documento",
            type: "number",
            placeholder: "0, 1, 2",
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
        <FormField
          key={name}
          name={name}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo Usuario</FormLabel>
              <FormControl>
                <Select defaultValue={String(field.value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione el tipo de usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Administador</SelectItem>
                    <SelectItem value="2">Vendedor</SelectItem>
                  </SelectContent>
                </Select>
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
