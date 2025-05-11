import { useState } from "react";
import { EllipsisVertical, LoaderCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
//import Sales from "@/pages/dashboard/sales";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import SalesForm from "./sales-form";
import { toast } from "sonner";

function ActionCell({ row }) {
  const [loading, setLoading] = useState(false);
  const [disableDialog, setDisableDialog] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  const onSubmit = () => {
    console.log(`Deshabilitando venta ${row.original.name}`);
    setLoading(true);
    setTimeout(() => {
      toast.success("Venta deshabilitada correctamente");
      setLoading(false);
      setDisableDialog(false);
    }, 2000);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <EllipsisVertical className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setEditDialog(true);
            }}
          >
            Editar
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-600"
            onSelect={(e) => {
              e.preventDefault();
              setDisableDialog(true);
            }}
          >
            Deshabilitar
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-black"
            onSelect={(e) => {
              e.preventDefault();
              setViewDetail(true);
            }}
          >
            Ver detalle
          </DropdownMenuItem>

          <AlertDialog open={disableDialog} onOpenChange={setDisableDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deshabilitar venta</AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Estás seguro de que deseas deshabilitar esta venta?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button variant="outline" onClick={() => setDisableDialog(false)}>
                  Cancelar
                </Button>
                <Button disabled={loading} onClick={onSubmit}>
                  {loading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                  Confirmar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog open={editDialog} onOpenChange={setEditDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar venta</DialogTitle>
                <DialogDescription>Complete el formulario para editar la venta.</DialogDescription>
              </DialogHeader>
              <SalesForm product={row.original} closeModal={() => setEditDialog(false)} />
            </DialogContent>
          </Dialog>

          <Sheet open={viewDetail} onOpenChange={setViewDetail}>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Detalle de la venta</SheetTitle>
                <SheetDescription>
                  <div className="space-y-2 mt-4 text-sm">
                    <p>
                      <strong>ID:</strong> {row.original.id}
                    </p>
                    <p>
                      <strong>Producto:</strong> {row.original.name}
                    </p>
                    <p>
                      <strong>Cantidad:</strong> {row.original.cantidad}
                    </p>
                    <p>
                      <strong>Precio unitario:</strong> ${row.original.price}
                    </p>
                    <p>
                      <strong>Subtotal:</strong> ${row.original.cantidad * row.original.price}
                    </p>
                    <p>
                      <strong>Total:</strong> ${row.original.cantidad * row.original.price}
                    </p>
                    <p>
                      <strong>Cliente:</strong> {row.original.cliente}
                    </p>
                    <p>
                      <strong>Fecha:</strong> {row.original.fecha}
                    </p>
                  </div>
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex justify-end"></div>
            </SheetContent>
          </Sheet>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ActionCell;
