import { forwardRef, useImperativeHandle } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    nombre: z.string().nonempty("Nombre es obligatorio"),
    apellido: z.string().nonempty("Apellido es obligatorio"),
    email: z.string().email("Email no válido"),
    password: z.string().nonempty("Contraseña es obligatorio"),
    confirmPassword: z.string().nonempty("Confirmar contraseña es obligatorio"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

const Step1 = forwardRef(({ defaultValues }, ref) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      confirmPassword: "",
      tipoUsuario: 0,
      ...defaultValues,
    },
  });

  useImperativeHandle(ref, () => ({
    validate: () =>
      new Promise((resolve) => {
        form.handleSubmit(
          (data) => {
            // eslint-disable-next-line no-unused-vars
            const { confirmPassword, ...rest } = data;
            resolve(rest);
          },
          () => resolve(null)
        )();
      }),
  }));

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col md:flex-row items-start gap-4">
          <FormField
            name="nombre"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
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
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
});

export default Step1;
