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
  name: z.string().nonempty("Razón social es obligatorio"),
  province: z.string().nonempty("Provincia es obligatorio"),
  city: z.string().nonempty("Ciudad es obligatorio"),
  street: z.string().nonempty("Calle es obligatorio"),
  number: z.string().nonempty("Número de calle es obligatorio"),
  zipCode: z.string().nonempty("Código postal es obligatorio"),
  imageURL: z.string().nonempty("URL de la imagen es obligatorio"),
  category: z.string().nonempty("Rubro es obligatorio"),
  currency: z.string().nonempty("Moneda es obligatorio"),
  plan: z.string().nonempty("Plan es obligatorio"),
});

const Step2 = forwardRef(({ defaultValues }, ref) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      province: "",
      city: "",
      street: "",
      number: "",
      zipCode: "",
      imageURL: "",
      category: "",
      currency: "",
      plan: "",
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
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razón social</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row items-start gap-4">
          <FormField
            name="province"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Provincia</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione la provincia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buenosaires">Buenos Aires</SelectItem>
                      <SelectItem value="catamarca">Catamarca</SelectItem>
                      <SelectItem value="chaco">Chaco</SelectItem>
                      <SelectItem value="chubut">Chubut</SelectItem>
                      <SelectItem value="caba">Ciudad Autónoma de Buenos Aires</SelectItem>
                      <SelectItem value="cordoba">Córdoba</SelectItem>
                      <SelectItem value="corrientes">Corrientes</SelectItem>
                      <SelectItem value="entrerios">Entre Ríos</SelectItem>
                      <SelectItem value="formosa">Formosa</SelectItem>
                      <SelectItem value="jujuy">Jujuy</SelectItem>
                      <SelectItem value="lapampa">La Pampa</SelectItem>
                      <SelectItem value="larioja">La Rioja</SelectItem>
                      <SelectItem value="mendoza">Mendoza</SelectItem>
                      <SelectItem value="misiones">Misiones</SelectItem>
                      <SelectItem value="neuquen">Neuquén</SelectItem>
                      <SelectItem value="rionegro">Río Negro</SelectItem>
                      <SelectItem value="salta">Salta</SelectItem>
                      <SelectItem value="sanjuan">San Juan</SelectItem>
                      <SelectItem value="sanluis">San Luis</SelectItem>
                      <SelectItem value="santacruz">Santa Cruz</SelectItem>
                      <SelectItem value="santafe">Santa Fe</SelectItem>
                      <SelectItem value="santiago">Santiago del Estero</SelectItem>
                      <SelectItem value="tierradelfuego">Tierra del Fuego</SelectItem>
                      <SelectItem value="tucuman">Tucumán</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="city"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Localidad</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4">
          <FormField
            name="street"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Calle</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                <FormLabel>Altura</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="zipCode"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Código postal</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="imageURL"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>URL logo del negocio</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Rubro</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione el rubro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clothing">Vestimenta</SelectItem>
                    <SelectItem value="food">Comida</SelectItem>
                    <SelectItem value="electronics">Electrónica</SelectItem>
                    <SelectItem value="household">Hogar</SelectItem>
                    <SelectItem value="transportation">Transporte</SelectItem>
                    <SelectItem value="health">Salud</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="currency"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Moneda</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione la moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ars">Peso argentino</SelectItem>
                    <SelectItem value="usd">Dólar americano</SelectItem>
                    <SelectItem value="eur">Euro</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="plan"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Plan</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione el plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Básico $</SelectItem>
                    <SelectItem value="premium">Premium $$$</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
});

export default Step2;
