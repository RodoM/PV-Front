import { useState } from "react";
import { EllipsisVertical, LoaderCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import ProductForm from "./product-form";
import { toast } from "sonner";

function ActionCell({ row }) {
  const [loading, setLoading] = useState(false);
  const [disableDialog, setDisableDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);

  const onSubmit = () => {
    console.log(`Deshabilitando producto ${row.original.name}`);
    setLoading(true);
    setTimeout(() => {
      toast.success("Producto deshabilitado correctamente");
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
            className="text-red-600"
            onSelect={(e) => {
              e.preventDefault();
              setDisableDialog(true);
            }}
          >
            Deshabilitar
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setEditDialog(true);
            }}
          >
            Editar
          </DropdownMenuItem>
          <AlertDialog open={disableDialog} onOpenChange={setDisableDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deshabilitar producto</AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Estás seguro de que deseas deshabilitar este producto? El mismo no estará
                  disponible para comprar.
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
                <DialogTitle>Editar producto</DialogTitle>
                <DialogDescription>
                  Complete el formulario para editar el producto.
                </DialogDescription>
              </DialogHeader>
              <ProductForm product={row.original} closeModal={() => setEditDialog(false)} />
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ActionCell;
