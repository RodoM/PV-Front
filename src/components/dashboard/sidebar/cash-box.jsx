import { useState } from "react";
import api from "@/lib/axios";
import { useBusiness } from "@/providers/business-context";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

function CashBox() {
  const { fetchCashBoxData, cashbox, loadingCashbox } = useBusiness();
  const [loading, setLoading] = useState(false);

  const formatoARS = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  const handleState = () => {
    setLoading(true);
    const endpoint = !cashbox.estaCerrada ? "/cashbox/close" : "/cashbox/open";
    api
      .post(endpoint, { montoApertura: 0 })
      .then(() => {
        toast.success(`Se ${!cashbox.estaCerrada ? "cerró" : "abrió"} correctamente la caja.`);
        fetchCashBoxData();
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error al ${!cashbox.estaCerrada ? "cerrar" : "abrir"} la caja.`);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-white dark:bg-black border border-border p-2 mx-2 rounded-md mt-auto">
      {loadingCashbox || !cashbox ? (
        <LoaderCircle className="h-4 w-4 animate-spin mx-auto my-4" />
      ) : (
        <>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Estado de caja:</span>
            <Badge variant={!cashbox.estaCerrada ? "active" : "inactive"}>
              {!cashbox.estaCerrada ? "Abierta" : "Cerrada"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {!cashbox.estaCerrada ? "Total" : "Ult."} ventas:{" "}
            {formatoARS.format(cashbox.totalVentas || 0)}
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full mt-2" variant="outline">
                {!cashbox.estaCerrada ? "Cerrar" : "Abrir"} caja
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {!cashbox.estaCerrada ? "Cerrar" : "Abrir"} caja
                </AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Estás seguro de que deseas {!cashbox.estaCerrada ? "cerrar" : "abrir"} la caja?
                  {!cashbox.estaCerrada
                    ? " Se cerrará el total y no se podrán realizar más ventas hasta abrir una nueva caja."
                    : " Se abrirá un nuevo total y se podrán realizar ventas."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Volver</AlertDialogCancel>
                <AlertDialogAction onClick={handleState}>
                  {loading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}

export default CashBox;
