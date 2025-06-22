import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Receipt, Printer } from "lucide-react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(amount);
};

const getPaymentMethod = (code) => {
  const methods = {
    1: "Efectivo",
    2: "Transferencia",
    3: "Débito",
    4: "Crédito",
    5: "QR",
    6: "MODO",
  };
  return methods[code] || "Otro";
};

function SaleDetailSheet({ open, onOpenChange, sale }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Recibo de Compra
          </SheetTitle>
          <SheetDescription>
            Comprobante #{sale.id} - {sale.comprobante.tipoComprobante}
          </SheetDescription>
        </SheetHeader>

        <div className="p-4 mt-6 space-y-4 font-mono text-sm">
          <div className="text-center space-y-1">
            <h2 className="font-bold text-lg">PUNTO DE VENTA</h2>
            <p>Puesto: {sale.puesto.nombre}</p>
          </div>

          <Separator />

          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Comprobante:</span>
              <span>#{sale.comprobante.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Tipo:</span>
              <span>{sale.comprobante.tipoComprobante}</span>
            </div>
            <div className="flex justify-between">
              <span>Fecha:</span>
              <span>{formatDate(sale.fechaAlta)}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-1">
            <h3 className="font-semibold">VENDEDOR</h3>
            <div className="flex justify-between">
              <span>Nombre:</span>
              <span>
                {sale.empleado.nombre} {sale.empleado.apellido}
              </span>
            </div>
            <div className="flex justify-between">
              <span>DNI:</span>
              <span>{sale.empleado.numeroDocumento}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="font-semibold">PRODUCTOS</h3>
            {sale.detalles.map((item, index) => (
              <div key={index} className="space-y-1 pb-2">
                <div className="font-medium">{item.nombreProducto}</div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {item.cantidad
                      ? `${item.cantidad} ${item.tipoUnidadMedida}`
                      : item.peso
                        ? `${item.peso} ${item.tipoUnidadMedida}`
                        : `1 ${item.tipoUnidadMedida}`}
                  </span>
                  <span>{formatCurrency(item.importe)}</span>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(sale.subtotal)}</span>
            </div>
            {sale.descuentoTotal && (
              <div className="flex justify-between text-green-600">
                <span>Descuento:</span>
                <span>-{formatCurrency(sale.descuentoTotal)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Impuestos:</span>
              <span>{formatCurrency(sale.impuestos)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>TOTAL:</span>
              <span>{formatCurrency(sale.total)}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-1">
            <h3 className="font-semibold">PAGO</h3>
            <div className="flex justify-between">
              <span>Método:</span>
              <span>{getPaymentMethod(sale.formaPago)}</span>
            </div>
          </div>

          <Separator />

          <div className="text-center text-xs text-muted-foreground space-y-1">
            <p>¡Gracias por su compra!</p>
            <p>Conserve este comprobante</p>
            <p className="mt-2">Generado el {formatDate(new Date().toISOString())}</p>
          </div>

          <div className="pt-4">
            <Button onClick={handlePrint} className="w-full gap-2">
              <Printer className="h-4 w-4" />
              Imprimir Recibo
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SaleDetailSheet;
