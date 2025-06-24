import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/providers/auth-context";
import { LoaderCircle, Camera } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarcodeScanner } from "@/components/dashboard/products/barcode-scanner";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  nombre: z.string().nonempty("Nombre es obligatorio"),
  categoriaId: z.number({
    required_error: "Categoría es obligatorio",
    invalid_type_error: "Debe ser una opción válida",
  }),
  marcaId: z.number({
    required_error: "Marca es obligatorio",
    invalid_type_error: "Debe ser una opción válida",
  }),
  rubroId: z.number({
    required_error: "Rubro es obligatorio",
    invalid_type_error: "Debe ser una opción válida",
  }),
  tipoUnidadMedida: z.number({
    required_error: "Tipo de unidad de medida es obligatorio",
    invalid_type_error: "Debe ser una opción válida",
  }),
  codigoBarra: z.string().nullable().optional(),
  descripcion: z.string().optional(),
  imagenUrl: z.string().optional(),
  ubicacion: z.string().optional(),
  valor: z.preprocess((val) => {
    if (val === "" || val === null || val === undefined) return undefined;
    const num = Number(val);
    return isNaN(num) ? val : num;
  }, z.number().optional()),
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

function ProductForm({ product, onProductAdded, closeModal }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: product?.nombre || "",
      categoriaId: product?.categoriaId || "",
      marcaId: product?.marcaId || "",
      rubroId: product?.rubroId || "",
      tipoUnidadMedida: product?.tipoUnidadMedida || "",
      codigoBarra: undefined,
      descripcion: product?.descripcion || "",
      imagenUrl: product?.imagenUrl || "",
      ubicacion: product?.ubicacion || "",
      valor: undefined,
      stockActual: product?.stockActual || 0,
      stockMinimo: product?.stockMinimo || 0,
      stockMaximo: product?.stockMaximo || 0,
    },
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/category/list").then((res) => {
      setCategories(res.data.data.data);
    });
  }, [setCategories]);

  const [brands, setBrands] = useState([]);

  useEffect(() => {
    api.get("/brand/list").then((res) => {
      setBrands(res.data.data.data);
    });
  }, [setBrands]);

  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    api.get("/sector/list").then((res) => {
      setIndustries(res.data.data);
    });
  }, [setIndustries]);

  const handleBarcodeScanned = (barcode) => {
    form.setValue("codigoBarra", barcode);
  };

  const onClose = () => {
    form.reset();
    closeModal();
  };

  const onSubmit = (data) => {
    const formattedData = {
      productoRequest: {
        nombre: data.nombre,
        categoriaId: Number(data.categoriaId),
        marcaId: Number(data.marcaId),
        rubroId: Number(data.rubroId),
        tipoUnidadMedida: Number(data.tipoUnidadMedida),
        codigoBarra: data.codigoBarra,
      },
      productoNegocioRequest: {
        negocioId: user.negocioId,
        descripcion: data.descripcion,
        imagenUrl: data.imagenUrl,
        ubicacion: data.ubicacion,
        valor: Number(data.valor),
        stockActual: Number(data.stockActual),
        stockMinimo: Number(data.stockMinimo),
        stockMaximo: Number(data.stockMaximo),
      },
    };

    setLoading(true);

    api
      .post("/product/register", formattedData)
      .then(() => {
        toast.success("Producto agregado correctamente");
        onProductAdded();
        closeModal();
        form.reset();
      })
      .catch((error) => {
        const { message } = error.response?.data || "Error al agregar el producto";
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="nombre"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del producto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row items-start gap-4">
          <FormField
            name="categoriaId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={String(field.value)}
                    disabled={!categories.length}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione la categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={String(category.id)}>
                          {category.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="marcaId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={String(field.value)}
                    disabled={!brands.length}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione la marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={String(brand.id)}>
                          {brand.nombre}
                        </SelectItem>
                      ))}
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
            name="rubroId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Rubro</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={String(field.value)}
                    disabled={!industries.length}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione el rubro" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry.id} value={String(industry.id)}>
                          {industry.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="tipoUnidadMedida"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Unidad de medida</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={String(field.value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Seleccione la u. de medida" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Unidad</SelectItem>
                      <SelectItem value="1">Par</SelectItem>
                      <SelectItem value="2">Docena</SelectItem>
                      <SelectItem value="3">Gramo</SelectItem>
                      <SelectItem value="4">Kilogramo</SelectItem>
                      <SelectItem value="5">Litro</SelectItem>
                      <SelectItem value="6">Milimetro</SelectItem>
                      <SelectItem value="7">Centimetro</SelectItem>
                      <SelectItem value="8">Metro</SelectItem>
                      <SelectItem value="9">Metro cuadrado</SelectItem>
                      <SelectItem value="10">Centimetro cuadrado</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="codigoBarra"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de barras</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input placeholder="123456789" {...field} className="flex-1" />
                  <BarcodeScanner onScan={handleBarcodeScanned}>
                    <Button type="button" variant="outline" size="icon" className="shrink-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </BarcodeScanner>
                </div>
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

        <FormField
          name="valor"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ingrese el nuevo precio de producto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

export default ProductForm;
