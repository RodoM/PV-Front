import { useEffect, useState } from "react";
import api from "@/lib/axios";
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
  const [getLoading, setGetLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchCashBoxData = () => {
    setGetLoading(true);
    api
      .get("/cashbox/data")
      .then((response) => {
        const { data } = response.data;
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setGetLoading(false));
  };

  useEffect(() => {
    fetchCashBoxData();
  }, []);

  const formatoARS = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  const handleState = () => {
    setPostLoading(true);
    const endpoint = !data.estaCerrada ? "/cashbox/open" : "/cashbox/close";
    api
      .post(endpoint, { montoApertura: 0 })
      .then(() => {
        toast.success(`Se ${!data.estaCerrada ? "abrió" : "cerró"} correctamente la caja.`);
        fetchCashBoxData();
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error al ${!data.estaCerrada ? "abrir" : "cerrar"} la caja.`);
      })
      .finally(() => setPostLoading(false));
  };

  return (
    <div className="bg-white dark:bg-black border border-border p-2 mx-2 rounded-md mt-auto">
      {getLoading ? (
        <LoaderCircle className="h-4 w-4 animate-spin mx-auto my-4" />
      ) : (
        <>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Estado de caja:</span>
            <Badge variant={!data.estaCerrada ? "active" : "inactive"}>
              {!data.estaCerrada ? "Abierta" : "Cerrada"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {!data.estaCerrada ? "Total" : "Ult."} ventas:{" "}
            {formatoARS.format(data.totalVentas || 0)}
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full mt-2" variant="outline">
                {!data.estaCerrada ? "Cerrar" : "Abrir"} caja
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{!data.estaCerrada ? "Cerrar" : "Abrir"} caja</AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Estás seguro de que deseas {!data.estaCerrada ? "cerrar" : "abrir"} la caja?
                  {!data.estaCerrada
                    ? " Se cerrará el total y no se podrán realizar más ventas hasta abrir una nueva caja."
                    : " Se abrirá un nuevo total y se podrán realizar ventas."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Volver</AlertDialogCancel>
                <AlertDialogAction onClick={handleState}>
                  {postLoading && <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />}
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
