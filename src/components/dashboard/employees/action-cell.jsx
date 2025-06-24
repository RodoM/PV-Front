import { useState } from "react";
import api from "@/lib/axios";
import { useRefresh } from "@/providers/refresh-context";
import { EllipsisVertical, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmployeeForm from "./employee-form";

function ActionCell({ row }) {
  const { triggerRefresh } = useRefresh();
  const [loading, setLoading] = useState(false);
  const [showDisable, setShowDisable] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const onDisable = () => {
    const isActive = row.original.activo;

    setLoading(true);
    if (isActive) {
      api
        .delete(`/user/disable/${row.original.id}`)
        .then(() => {
          toast.success("Empleado deshabilitado correctamente");
          setShowDisable(false);
          triggerRefresh();
        })
        .catch((error) => {
          const message = error.response?.data?.message || "Error al deshabilitar el Empleado";
          toast.error(message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      api
        .put(`/user/activate/${row.original.id}`)
        .then(() => {
          toast.success("Empleado habilitado correctamente");
          setShowDisable(false);
          triggerRefresh();
        })
        .catch((error) => {
          const message = error.response?.data?.message || "Error al habilitar el Empleado";
          toast.error(message);
        })
        .finally(() => {
          setLoading(false);
        });
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
            className="text-red-600"
            onSelect={(e) => {
              e.preventDefault();
              setShowDisable(true);
            }}
          >
            {row.original.activo ? "Deshabilitar" : "Habilitar"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setShowEdit(true);
            }}
          >
            Editar
          </DropdownMenuItem>
          <AlertDialog open={showDisable} onOpenChange={setShowDisable}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {row.original.activo ? "Deshabilitar" : "Habilitar"} empleado
                </AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Seguro que deseas {row.original.activo ? "deshabilitar" : "habilitar"} al
                  empleado?
                  {row.original.activo
                    ? " No podrá acceder al sistema"
                    : " Podrá volver a acceder al sistema"}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button variant="outline" onClick={() => setShowDisable(false)}>
                  Cancelar
                </Button>
                <Button disabled={loading} onClick={onDisable}>
                  {loading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                  Confirmar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog open={showEdit} onOpenChange={setShowEdit}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar empleado</DialogTitle>
                <DialogDescription>Modificá la información del empleado.</DialogDescription>
              </DialogHeader>
              <EmployeeForm employee={row.original} closeModal={() => setShowEdit(false)} />
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ActionCell;
