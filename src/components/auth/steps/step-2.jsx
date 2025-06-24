import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import api from "@/lib/axios";
import { monedas, documentos, facturaciones } from "@/enums/index";

const schema = z
  .object({
    nombre: z.string().nonempty("Nombre es obligatorio"),
    descripcion: z.string().optional(),
    rubroId: z.number({
      required_error: "Rubro es obligatorio",
    }),
    pais: z.string(),
    provincia: z.string(),
    ciudad: z.string(),
    codigoPostal: z.string(),
    calle: z.string(),
    altura: z.string(),
    usaFacturacion: z.boolean(),
    tipoFacturacion: z.number().nullable().optional(),
    moneda: z.number().optional(),
    tipoDocumento: z.number().optional(),
    numeroDocumento: z.string(),
    email: z.string().email("Email no válido"),
    telefono: z.string().optional(),
    planSaasId: z.number({
      required_error: "Plan es obligatorio",
    }),
  })
  .refine(
    (data) => {
      if (data.usaFacturacion) {
        return data.tipoFacturacion !== null && data.tipoFacturacion !== undefined;
      } else {
        return data.tipoFacturacion === null || data.tipoFacturacion === undefined;
      }
    },
    {
      message: "Debe seleccionar un tipo de facturación",
      path: ["tipoFacturacion"],
    }
  );

const Step2 = forwardRef(({ defaultValues }, ref) => {
  const [rubroOptions, setRubroOptions] = useState([]);
  const [planOptions, setPlanOptions] = useState([]);

  const initialValues = {
    nombre: "",
    descripcion: "",
    rubroId: undefined,
    pais: "",
    provincia: "",
    ciudad: "",
    codigoPostal: "",
    calle: "",
    altura: "",
    usaFacturacion: false,
    tipoFacturacion: undefined,
    moneda: undefined,
    tipoDocumento: undefined,
    numeroDocumento: "",
    email: "",
    telefono: undefined,
    planSaasId: undefined,
    ...defaultValues,
  };

  const convertedValues = {
    ...initialValues,
    usaFacturacion:
      defaultValues?.usaFacturacion ??
      (initialValues.tipoFacturacion !== "" && initialValues.tipoFacturacion !== undefined),
    tipoFacturacion: facturaciones[initialValues.tipoFacturacion] ?? undefined,
    moneda: monedas[initialValues.moneda] ?? undefined,
    tipoDocumento: documentos[initialValues.tipoDocumento] ?? undefined,
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: convertedValues,
  });

  const watchUsaFacturacion = useWatch({
    control: form.control,
    name: "usaFacturacion",
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

  useEffect(() => {
    api
      .get("/sector/list")
      .then((res) => setRubroOptions(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    api
      .get("/plan/list")
      .then((res) => setPlanOptions(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <FormField
          name="nombre"
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

        <FormField
          name="rubroId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Rubro</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={String(field.value)}
                  disabled={!rubroOptions.length}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione el rubro" />
                  </SelectTrigger>
                  <SelectContent>
                    {rubroOptions.map((rubro) => (
                      <SelectItem key={rubro.id} value={String(rubro.id)}>
                        {rubro.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row items-start gap-4">
          <FormField
            name="pais"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Pais</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione el pais" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="argentina">Argentina</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="provincia"
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
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4">
          <FormField
            name="ciudad"
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

          <FormField
            name="codigoPostal"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Código postal</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row items-start gap-4">
          <FormField
            name="calle"
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
            name="altura"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Altura</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="usaFacturacion"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    if (!checked) {
                      form.setValue("tipoFacturacion", null);
                    }
                  }}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Facturación</FormLabel>
                <FormDescription>Marque esta opción si utiliza facturación</FormDescription>
              </div>
            </FormItem>
          )}
        />

        {watchUsaFacturacion && (
          <FormField
            name="tipoFacturacion"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tipo de facturación</FormLabel>
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
                      <SelectValue placeholder="Seleccione el tipo de facturación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Manual</SelectItem>
                      <SelectItem value="1">Electrónica</SelectItem>
                      <SelectItem value="2">Externa</SelectItem>
                      <SelectItem value="3">Ticketera</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          name="moneda"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Moneda</FormLabel>
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
                    <SelectValue placeholder="Seleccione la moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Peso argentino</SelectItem>
                    <SelectItem value="1">Dólar americano</SelectItem>
                    <SelectItem value="2">Euro</SelectItem>
                    <SelectItem value="3">Real brasileño</SelectItem>
                    <SelectItem value="4">Peso chileno</SelectItem>
                    <SelectItem value="5">Peso uruguayo</SelectItem>
                    <SelectItem value="6">Peso colombiano</SelectItem>
                    <SelectItem value="7">Peso mexicano</SelectItem>
                    <SelectItem value="8">Peso paraguayo</SelectItem>
                    <SelectItem value="9">Boliviano</SelectItem>
                    <SelectItem value="10">Bolivar</SelectItem>
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
          name="telefono"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefono</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="planSaasId"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Plan</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={String(field.value)}
                  disabled={!planOptions.length}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione el plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {planOptions.map((plan) => (
                      <SelectItem key={plan.id} value={String(plan.id)}>
                        {plan.nombre}
                      </SelectItem>
                    ))}
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
