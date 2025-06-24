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
import { roles, documentos } from "@/enums/index";

function getSchema(isEdit = false) {
  const base = {
    nombre: z.string().nonempty("El nombre es obligatorio"),
    apellido: z.string().nonempty("El apellido es obligatorio"),
    email: z.string().email("Email no válido"),
    tipoUsuario: z.number({ required_error: "Tipo de usuario es obligatorio" }),
    tipoDocumento: z.number({ required_error: "Tipo de documento es obligatorio" }),
    numeroDocumento: z.string().nonempty("Número de documento es obligatorio"),
    imagenUrl: z.string().optional(),
    nuevaPassword: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: "La contraseña debe tener al menos 8 caracteres",
      })
      .refine((val) => !val || /(?=.*\d)(?=.*[A-Z])/.test(val), {
        message: "La contraseña debe incluir al menos un número y una letra mayúscula",
      }),
  };

  return z.object({
    ...base,
    password: isEdit
      ? z.string().optional()
      : z
          .string()
          .nonempty("Contraseña es obligatoria")
          .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
          .refine((val) => /(?=.*\d)(?=.*[A-Z])/.test(val), {
            message: "La contraseña debe incluir al menos un número y una letra mayúscula",
          }),
  });
}

function EmployeeForm({ employee, closeModal }) {
  const [loading, setLoading] = useState(false);
  const { triggerRefresh } = useRefresh();

  const schema = getSchema(!!employee);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: employee?.nombre || "",
      apellido: employee?.apellido || "",
      email: employee?.email || "",
      tipoUsuario: roles[employee?.tipoUsuario.toUpperCase()] ?? undefined,
      tipoDocumento: documentos[employee?.tipoDocumento] ?? undefined,
      numeroDocumento: employee?.numeroDocumento || "",
      avatarUrl: employee?.avatarUrl || "",
      password: employee?.password || "",
      nuevaPassword: undefined,
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    if (employee) {
      api
        .put("/user/modify", { ...data }, { params: { usuarioId: employee.id } })
        .then(() => {
          toast.success("Empleado modificado correctamente");
          triggerRefresh();
          closeModal();
          form.reset();
        })
        .catch((error) => {
          const { message } = error.response?.data || "Error al modificar el Empleado";
          toast.error(message);
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
          const { message } = error.response?.data || "Error al agregar el Empleado";
          toast.error(message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row items-start gap-4">
          <FormField
            name="nombre"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del empleado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="apellido"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Apellido del empleado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email del empleado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="tipoUsuario"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Rol</FormLabel>
              <FormControl>
                <Select
                  value={
                    field.value !== null && field.value !== undefined
                      ? String(field.value)
                      : undefined
                  }
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione el rol del empleado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Administrador</SelectItem>
                    <SelectItem value="2">Vendedor</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row items-start gap-4">
          <FormField
            name="tipoDocumento"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tipo de documento</FormLabel>
                <FormControl>
                  <Select
                    value={
                      field.value !== null && field.value !== undefined
                        ? String(field.value)
                        : undefined
                    }
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione el tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">DNI</SelectItem>
                      <SelectItem value="1">CUIT</SelectItem>
                      <SelectItem value="2">Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="numeroDocumento"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Número de documento</FormLabel>
                <FormControl>
                  <Input placeholder="Número de documento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="avatarUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Imagen de perfil</FormLabel>
              <FormControl>
                <Input placeholder="URL de la imagen de perfil" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {employee ? (
          <FormField
            name="nuevaPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nueva contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Nueva contraseña del empleado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Contraseña del empleado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
