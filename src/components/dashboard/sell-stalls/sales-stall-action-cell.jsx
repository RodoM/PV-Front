import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SalesStandForm from "./sales-stand-form"; // Asumimos que este es el formulario reutilizable
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import api from "@/lib/axios";
import { useRefresh } from "@/providers/refresh-context";
import { toast } from "sonner"; // Si estás usando Sonner para notificaciones

function ActionCell({ row }) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { triggerRefresh } = useRefresh();

  const handleDisable = async () => {
    const id = row.original.id;
    try {
      await api.patch(`/businesssell/${id}/disable`); // Asegurate que el endpoint sea correcto
      toast.success("Puesto deshabilitado correctamente");
      triggerRefresh();
    } catch (error) {
      console.error(error);
      toast.error("Error al deshabilitar el puesto");
    }
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
              setOpenEditDialog(true);
            }}
          >
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              handleDisable();
            }}
          >
            Deshabilitar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal de edición */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar puesto de venta</DialogTitle>
          </DialogHeader>
          <SalesStandForm salesStand={row.original} closeModal={() => setOpenEditDialog(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ActionCell;
