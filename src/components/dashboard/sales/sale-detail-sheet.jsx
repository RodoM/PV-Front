import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useBusiness } from "@/providers/business-context";
import { Printer } from "lucide-react";

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
    0: "Efectivo",
    1: "Transferencia",
    2: "Débito",
    3: "Crédito",
    4: "QR",
    5: "MODO",
  };
  return methods[code] || "Otro";
};

function SaleDetailSheet({ open, onOpenChange, sale }) {
  const { business } = useBusiness();

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }

          .print-receipt {
            width: 100% !important;
            max-width: 100% !important;
            page-break-inside: avoid;
            break-inside: avoid;
            margin: 0;
            padding: 0;
          }

          .print-page {
            page-break-before: auto;
            page-break-after: auto;
            page-break-inside: avoid;
          }

          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="print-receipt w-full max-w-[540px] max-h-screen overflow-y-auto bg-white text-gray-900 font-mono text-sm">
          <div className="print-page">
            <SheetHeader className="text-center mb-4">
              <SheetTitle className="text-xl font-bold text-gray-900">
                {business?.nombre}
              </SheetTitle>
              <SheetDescription className="text-gray-600">
                CUIT: {business?.numeroDocumento}
              </SheetDescription>
              <div className="text-gray-600">Domicilio: {business?.domicilio}</div>
              <div className="mt-2 font-bold text-base text-blue-600">COMPROBANTE DE VENTA</div>
              <div className="text-sm mt-1">
                N°: <strong>{sale?.comprobante?.id}</strong>
              </div>
              <div className="text-sm">Fecha: {formatDate(sale?.fechaAlta)}</div>
              <div className="text-sm">
                Vendedor: {sale?.empleado?.nombre} {sale?.empleado?.apellido}
              </div>
              <div className="text-sm">Puesto: {sale?.puesto?.nombre}</div>
            </SheetHeader>

            <Separator className="my-4" />

            <div className="mb-4">
              <h3 className="font-bold text-base text-gray-900 mb-2">DETALLE DE PRODUCTOS</h3>
              {sale?.detalles?.map((item, index) => (
                <div key={index} className="flex justify-between flex-wrap text-sm border-b py-1">
                  <span>{item.nombreProducto}</span>
                  <span>{formatCurrency(item.importe)}</span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="mb-4 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(sale.subtotal)}</span>
              </div>
              {sale.descuentoTotal > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Descuento:</span>
                  <span>-{formatCurrency(sale.descuentoTotal)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Impuestos:</span>
                <span>{formatCurrency(sale.impuestos)}</span>
              </div>
              <Separator className="my-3 border-dashed" />
              <div className="flex justify-between font-bold text-base text-gray-900">
                <span>TOTAL:</span>
                <span>{formatCurrency(sale.total)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="mb-4">
              <h3 className="font-bold text-base text-gray-900 mb-2">FORMA DE PAGO</h3>
              <div className="flex justify-between">
                <span>Método:</span>
                <span>{getPaymentMethod(sale.formaPago)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="text-center text-xs text-muted-foreground">
              <p className="mb-1">¡Gracias por su compra!</p>
              <p className="mb-1">Este comprobante no tiene validez fiscal</p>
              <p className="mt-2">Generado el {formatDate(new Date().toISOString())}</p>
            </div>

            <div className="pt-4 no-print">
              <Button onClick={handlePrint} className="w-full gap-2">
                <Printer className="h-4 w-4" />
                Imprimir Recibo
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default SaleDetailSheet;
