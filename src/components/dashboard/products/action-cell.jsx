import { useState } from "react";
import {
  CirclePlus,
  EllipsisVertical,
  LoaderCircle,
  History,
  Pencil,
  Ban,
  RotateCcw,
} from "lucide-react";
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
import UpdateProductForm from "./update-product-form";
import PriceForm from "./price-form";
import HistoricalPrices from "./historical-prices";
import { toast } from "sonner";

function ActionCell({ row }) {
  const [loading, setLoading] = useState(false);
  const [disableDialog, setDisableDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [priceDialog, setPriceDialog] = useState(false);
  const [historyDialog, setHistoryDialog] = useState(false);

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
            onSelect={(e) => {
              e.preventDefault();
              setEditDialog(true);
            }}
          >
            <Pencil className="h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setPriceDialog(true);
            }}
          >
            <CirclePlus className="h-4 w-4" />
            Cargar precio
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setHistoryDialog(true);
            }}
          >
            <History className="h-4 w-4" />
            Ver historico de precios
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600"
            onSelect={(e) => {
              e.preventDefault();
              setDisableDialog(true);
            }}
          >
            {row.original.enabled ? (
              <Ban className="text-red-600 h-4 w-4" />
            ) : (
              <RotateCcw className="text-red-600 h-4 w-4" />
            )}
            {row.original.enabled ? "Deshabilitar" : "Habilitar"}
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

          <Dialog open={priceDialog} onOpenChange={setPriceDialog}>
            <DialogContent className="h-screen md:h-auto md:max-h-[500px] 2xl:max-h-[650px] overflow-y-auto scrollable">
              <DialogHeader>
                <DialogTitle>Cargar precio</DialogTitle>
                <DialogDescription>
                  Cargar un precio nuevo para {row.original.nombre}.
                </DialogDescription>
              </DialogHeader>
              <PriceForm
                productoNegocioId={row.original.productoNegocioId}
                closeModal={() => setPriceDialog(false)}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={historyDialog} onOpenChange={setHistoryDialog}>
            <DialogContent className="w-screen md:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Historico de precios</DialogTitle>
                <DialogDescription>
                  Historial de precios de {row.original.nombre} a la fecha.
                </DialogDescription>
              </DialogHeader>
              <HistoricalPrices productoNegocioId={row.original.productoNegocioId} />
            </DialogContent>
          </Dialog>

          <Dialog open={editDialog} onOpenChange={setEditDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar producto</DialogTitle>
                <DialogDescription>
                  Complete el formulario para editar {row.original.nombre}.
                </DialogDescription>
              </DialogHeader>
              <UpdateProductForm product={row.original} closeModal={() => setEditDialog(false)} />
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ActionCell;
