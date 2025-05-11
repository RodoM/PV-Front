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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().nonempty("Nombre es obligatorio"),
  idType: z.string().nonempty("Tipo de documento es obligatorio"),
  number: z.string().nonempty("Número de documento es obligatorio"),
  email: z.string().email("Email no válido"),
  phone: z.string().nonempty("Teléfono es obligatorio"),
});

const Step1 = forwardRef(({ defaultValues }, ref) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      idType: "",
      number: "",
      email: "",
      phone: "",
      ...defaultValues,
    },
  });

  useImperativeHandle(ref, () => ({
    validate: () =>
      new Promise((resolve) => {
        form.handleSubmit(
          (data) => resolve(data),
          () => resolve(null)
        )();
      }),
  }));

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre y apellido</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row items-start gap-4">
          <FormField
            name="idType"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tipo de documento</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione un tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dni">DNI</SelectItem>
                      <SelectItem value="cuit">CUIT</SelectItem>
                      <SelectItem value="passport">Pasaporte</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="number"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Número de documento</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
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
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input {...field} />
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
