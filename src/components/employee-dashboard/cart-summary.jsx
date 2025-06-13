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
import { Label } from "@/components/ui/label";
import { ShoppingCart } from "lucide-react";
import { CartItemComponent } from "./cart-item";

export function CartSummary({ cartItems, onUpdateQuantity, onRemoveItem, onConfirmPurchase }) {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal;

  const handleConfirmPurchase = () => {
    if (customer.name && customer.email && customer.phone) {
      onConfirmPurchase(customer);
      setCustomer({ name: "", email: "", phone: "" });
      setIsDialogOpen(false);
    }
  };

  const isFormValid = customer.name && customer.email && customer.phone;

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

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="Ingresa el nombre del cliente"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="cliente@ejemplo.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="Número de teléfono"
                />
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between text-lg font-semibold mb-4">
                  <span>Total a pagar:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Button
                  onClick={handleConfirmPurchase}
                  disabled={!isFormValid}
                  className="w-full"
                  size="lg"
                >
                  Finalizar Compra
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
