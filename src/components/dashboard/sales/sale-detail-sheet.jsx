import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function SaleDetailSheet({ open, onOpenChange, sale }) {
  if (!sale) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detalle de la venta</SheetTitle>
          <SheetDescription>
            <div className="space-y-2 mt-4 text-sm">
              <p>
                <strong>ID:</strong> {sale.id}
              </p>
              <p>
                <strong>Producto:</strong> {sale.name}
              </p>
              <p>
                <strong>Cantidad:</strong> {sale.cantidad}
              </p>
              <p>
                <strong>Precio unitario:</strong> ${sale.price}
              </p>
              <p>
                <strong>Subtotal:</strong> ${sale.cantidad * sale.price}
              </p>
              <p>
                <strong>Total:</strong> ${sale.cantidad * sale.price}
              </p>
              <p>
                <strong>Cliente:</strong> {sale.cliente}
              </p>
              <p>
                <strong>Fecha:</strong> {sale.fecha}
              </p>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default SaleDetailSheet;
