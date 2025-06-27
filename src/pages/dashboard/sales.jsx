import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Link } from "react-router-dom";
import DataTable from "@/components/ui/data-table";
import { columns } from "@/components/dashboard/sales/sales-columns";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function Sales() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    api
      .get("/sale/list", { params: { pageNumber, pageSize } })
      .then((res) => {
        const { data } = res.data;

        const ventasFiltradas = data.data.filter(
          (venta) =>
            venta.comprobante?.tipoComprobante === "ComprobanteVenta" ||
            venta.comprobante?.tipoComprobante === "ConsumoInterno"
        );
        setData(ventasFiltradas);
        setPageCount(data.totalPages);
      })
      .catch(() => {
        toast.error("Error al cargar las ventas");
      })
      .finally(() => setLoading(false));
  }, [pageNumber, pageSize]);

  return (
    <div className="flex flex-col items-end">
      <Button>
        <Link to="/puestos">Realizar venta</Link>
      </Button>
      <DataTable
        columns={columns}
        loading={loading}
        data={data}
        pageSize={pageSize}
        pageNumber={pageNumber}
        pageCount={pageCount}
        onPageChange={(pageNumber) => setPageNumber(pageNumber)}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
      />
    </div>
  );
}

export default Sales;
