import { useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/providers/auth-context";
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
import { Button } from "@/components/ui/button";
import { roles, documentos } from "@/enums/index";

const getSchema = (role) =>
  z
    .object({
      nombre: z.string().nonempty("El nombre es obligatorio"),
      apellido: z.string().nonempty("El apellido es obligatorio"),
      email: z.string().email("Email no válido"),
      tipoUsuario:
        role === "Owner"
          ? z.number().optional()
          : z.number({ required_error: "Tipo de usuario es obligatorio" }),
      tipoDocumento: z.number({ required_error: "Tipo de documento es obligatorio" }),
      numeroDocumento: z.string().nonempty("Número de documento es obligatorio"),
      imagenUrl: z.string().optional(),

      passwordActual: z
        .string()
        .transform((val) => (val === "" ? undefined : val))
        .optional()
        .refine((val) => !val || val.length >= 8, {
          message: "La contraseña debe tener al menos 8 caracteres",
        })
        .refine((val) => !val || /(?=.*\d)(?=.*[A-Z])/.test(val), {
          message: "La contraseña debe incluir al menos un número y una letra mayúscula",
        }),

      nuevaPassword: z
        .string()
        .transform((val) => (val === "" ? undefined : val))
        .optional()
        .refine((val) => !val || val.length >= 8, {
          message: "La contraseña debe tener al menos 8 caracteres",
        })
        .refine((val) => !val || /(?=.*\d)(?=.*[A-Z])/.test(val), {
          message: "La contraseña debe incluir al menos un número y una letra mayúscula",
        }),
    })
    .refine(
      (data) => {
        if (
          (data.passwordActual && !data.nuevaPassword) ||
          (!data.passwordActual && data.nuevaPassword)
        ) {
          return false;
        }
        return true;
      },
      {
        message: "Ambas contraseñas deben completarse para actualizar la contraseña",
        path: ["passwordActual"],
      }
    );

function UserForm({ userData }) {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const schema = getSchema(user?.role);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: userData?.nombre || "",
      apellido: userData?.apellido || "",
      email: userData?.email || "",
      tipoUsuario:
        user?.role === "Owner"
          ? undefined
          : (roles[userData?.tipoUsuario.toUpperCase()] ?? undefined),
      tipoDocumento: documentos[userData?.tipoDocumento] ?? undefined,
      numeroDocumento: userData?.numeroDocumento || "",
      avatarUrl: userData?.avatarUrl || "",
      passwordActual: undefined,
      nuevaPassword: undefined,
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    api
      .put("/user/modify", { ...data })
      .then((response) => {
        const { data } = response.data;
        setUser({
          ...user,
          name: `${data.nombre} ${data.apellido}`,
          email: data.email,
          role: data.tipoUsuario,
        });
        toast.success("Usuario modificado correctamente");
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Error al modificar el usuario";
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row items-start gap-4">
          <FormField
            name="nombre"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese su nombre" {...field} />
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
                  <Input placeholder="Ingrese su apellido" {...field} />
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
                <Input type="email" placeholder="Ingrese su email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {user.role !== "Owner" && (
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
                      <SelectValue placeholder="Seleccione su rol" />
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
        )}

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

        <div className="flex flex-col md:flex-row items-start gap-4">
          <FormField
            name="passwordActual"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Contraseña actual</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Ingrese su contraseña actual" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="nuevaPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nueva contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Ingrese su nueva contraseña" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-fit ml-auto" disabled={loading}>
          {loading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
          Actualizar datos
        </Button>
      </form>
    </Form>
  );
}

export default UserForm;
