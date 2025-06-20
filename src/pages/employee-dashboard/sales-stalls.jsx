import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Header } from "@/components/employee-dashboard/header";
import SalesStallsList from "@/components/employee-dashboard/sales-stall-list";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

function SalesStalls() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
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
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto py-10">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <LoaderCircle className="h-4 w-4 animate-spin mx-auto my-5" />
          </div>
        ) : (
          <SalesStallsList stalls={data} />
        )}
      </div>
    </>
  );
}

export default SalesStalls;
