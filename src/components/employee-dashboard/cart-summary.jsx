import { useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/providers/auth-context";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ShoppingCart, LoaderCircle } from "lucide-react";
import { CartItemComponent } from "./cart-item";
import { toast } from "sonner";
import { tipoUnidadMedidas, factoresConversion } from "@/enums/index";

const schema = z.object({
  formaPago: z.number(),
  tipoComprobante: z.number(),
});

const unidadesPorPeso = [
  "Kilogramo",
  "Gramo",
  "MetroCuadrado",
  "CentimetroCuadrado",
  "Metro",
  "Centimetro",
  "Milimetro",
];

export function CartSummary({ cartItems, onUpdateQuantity, onRemoveItem, onConfirmPurchase }) {
  const { user } = useAuth();
  const { id } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      formaPago: 0,
      tipoComprobante: 0,
    },
  });

  const calcularImporte = (item) => {
    const unidadBase = Object.keys(tipoUnidadMedidas).find(
      (key) => tipoUnidadMedidas[key] === item.tipoUnidadMedida
    );

    const unidadSeleccionada = Object.keys(tipoUnidadMedidas).find(
      (key) => tipoUnidadMedidas[key] === item.unidadSeleccionada
    );

    const factor = factoresConversion[unidadSeleccionada]?.[unidadBase] ?? 1;
    const cantidadConvertida = item.quantity * factor;
    const importe = item.precioActivo ? item.precioActivo * cantidadConvertida : 0;

    return { importe, cantidadConvertida, unidadBase };
  };

  const generarDetalles = () => {
    let subtotal = 0;

    const detalles = cartItems.map((item) => {
      const { importe, cantidadConvertida, unidadBase } = calcularImporte(item);

      const isPeso = unidadesPorPeso.includes(unidadBase);

      subtotal += importe;

      return {
        productoNegocioId: item.productoNegocioId,
        cantidad: isPeso ? undefined : cantidadConvertida,
        peso: isPeso ? cantidadConvertida : undefined,
        importe,
        tipoUnidadMedida: item.tipoUnidadMedida,
      };
    });

    return { detalles, subtotal, total: subtotal };
  };

  const { detalles, subtotal, total } = generarDetalles();

  const onSubmit = (data) => {
    setLoading(true);

    api
      .post("/sale/register", {
        ...data,
        negocioId: user.negocioId,
        puestoId: id,
        subtotal,
        total,
        detalles,
      })
      .then((response) => {
        toast.success("¡Compra confirmada!");
        onConfirmPurchase(response.data.data.id);
        setIsDialogOpen(false);
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Error al confirmar la compra";
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (cartItems.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <h2 className="text-lg font-semibold mb-4 pb-2 border-b">Pedido</h2>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Carrito vacío</p>
            <p className="text-sm">Agrega productos para comenzar</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
        Pedido ({cartItems.length} {cartItems.length === 1 ? "producto" : "productos"})
      </h2>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {cartItems.map((item) => {
          const { importe } = calcularImporte(item);

          return (
            <CartItemComponent
              key={item.productoNegocioId}
              item={item}
              importe={importe}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          );
        })}
      </div>

      <div className="border-t pt-4 space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" size="lg">
              Confirmar venta
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalles de la venta</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="formaPago"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Forma de pago</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          defaultValue={String(field.value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione la forma de pago" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Efectivo</SelectItem>
                            <SelectItem value="1">Transferencia</SelectItem>
                            <SelectItem value="2">Débito</SelectItem>
                            <SelectItem value="3">Crédito</SelectItem>
                            <SelectItem value="4">QR</SelectItem>
                            <SelectItem value="5">MODO</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="tipoComprobante"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Comprobante</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(Number(value))}
                          defaultValue={String(field.value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione el comprobante" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Venta</SelectItem>
                            <SelectItem value="1">Consumo interno</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                  Confirmar venta
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
