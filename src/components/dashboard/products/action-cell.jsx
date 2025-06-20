import { useState } from "react";
import { CirclePlus, EllipsisVertical, History, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

function ActionCell({ row }) {
  const [editDialog, setEditDialog] = useState(false);
  const [priceDialog, setPriceDialog] = useState(false);
  const [historyDialog, setHistoryDialog] = useState(false);

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
