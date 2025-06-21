import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

function SaleDetailSheet({ open, onOpenChange, sale }) {
  if (!sale) return null;

  const fecha = sale.comprobante?.fechaAlta?.split("T")[0];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detalle de la venta</SheetTitle>
          <div className="space-y-2 mt-4 text-sm">
            <p>
              <strong>ID:</strong> {sale.id}
            </p>
            <p>
              <strong>Tipo comprobante:</strong> {sale.comprobante?.tipoComprobante}
            </p>
            <p>
              <strong>Fecha:</strong> {fecha}
            </p>

            <hr className="my-2" />

            <h3 className="font-semibold">Productos:</h3>
            {sale.detalles?.map((item, i) => (
              <div key={i} className="ml-2">
                <p>
                  <strong>Producto:</strong> {item.nombreProducto}
                </p>
                <p>
                  <strong>Cantidad:</strong> {item.cantidad ?? item.peso} {item.tipoUnidadMedida}
                </p>
                <p>
                  <strong>Importe:</strong> ${item.importe}
                </p>
                <hr className="my-2" />
              </div>
            ))}

            <p className="mt-4">
              <strong>Subtotal:</strong> ${sale.subtotal}
            </p>
            <p>
              <strong>Total:</strong> ${sale.total}
            </p>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default SaleDetailSheet;
