import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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

const schema = z.object({
  email: z.string().email("Email no válido"),
  // paymentMethod: z.string().nonempty("Método de pago es obligatorio"),
});

export function CartSummary({ cartItems, onUpdateQuantity, onRemoveItem, onConfirmPurchase }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      // paymentMethod: "",
    },
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConfirmPurchase(data);
      setIsDialogOpen(false);
    }, 2000);
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
        {cartItems.map((item) => (
          <CartItemComponent
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
        ))}
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
              Confirmar Compra
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Datos del Cliente</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="cliente@ejemplo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                  Confirmar compra
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
