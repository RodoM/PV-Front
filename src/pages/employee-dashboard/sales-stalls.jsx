import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useBusiness } from "@/providers/business-context";
import { LoaderCircle, Lock } from "lucide-react";
import { Header } from "@/components/employee-dashboard/header";
import SalesStallsList from "@/components/employee-dashboard/sales-stall-list";
import { toast } from "sonner";

function SalesStalls() {
  const { fetchCashBoxData, cashbox } = useBusiness();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getSalesStalls = () => {
    api
      .get("/terminal/list", {
        params: { pageNumber: 1, pageSize: 1000 },
      })
      .then((res) => {
        const { data } = res.data;
        setData(data.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error al cargar los puntos de venta");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCashBoxData();
    setLoading(true);
  }, []);

  useEffect(() => {
    if (cashbox === null) return;

    if (cashbox.estaCerrada) {
      setLoading(false);
    } else {
      getSalesStalls();
    }
  }, [cashbox]);

  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col justify-center h-[calc(100vh-64px)] gap-4 p-4">
        {loading || !cashbox ? (
          <div className="flex items-center justify-center h-full">
            <LoaderCircle className="h-4 w-4 animate-spin mx-auto my-5" />
          </div>
        ) : !data?.length ? (
          <div className="flex flex-col justify-center items-center gap-2 mb-5">
            <Lock className="h-16 w-16 text-muted-foreground" />
            <p className="font-bold text-2xl">La caja esta cerrada</p>
            <p>Hasta no abrirse no podrás acceder a los puntos de venta</p>
          </div>
        ) : (
          <SalesStallsList stalls={data} />
        )}
      </div>
    </>
  );
}

export default SalesStalls;
