import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [showDisable, setShowDisable] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const onDisable = () => {
    console.log("Deshabilitando empleado:", row.original.name);
    setLoading(true);
    setTimeout(() => {
      toast.success("Empleado deshabilitado correctamente");
      setLoading(false);
      setShowDisable(false);
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
              setShowDisable(true);
            }}
          >
            Deshabilitar
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-white"
            onSelect={(e) => {
              e.preventDefault();
              setShowEdit(true);
            }}
          >
            Editar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDisable} onOpenChange={setShowDisable}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deshabilitar empleado</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Seguro que deseas deshabilitar al empleado? No podrá acceder al sistema.
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
    </>
  );
}

export default ActionCell;
