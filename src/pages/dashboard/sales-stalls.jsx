import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import DataTable from "@/components/ui/data-table";
import { columns } from "@/components/dashboard/sell-stalls/columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import SalesStallForm from "@/components/dashboard/sell-stalls/sales-stall-form";
import { useRefresh } from "@/providers/refresh-context";
import { toast } from "sonner";

function SalesStalls() {
  const [addDialog, setAddDialog] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [nombre, setNombre] = useState("");
  const { refreshKey, triggerRefresh } = useRefresh();

  useEffect(() => {
    api
      .get("/terminal/list", { params: { pageNumber, pageSize, nombre } })
      .then((res) => {
        const { data } = res.data;
        setData(data.data); // lista
        setPageCount(data.totalPages); // paginas
      })
      .catch(() => {
        toast.error("Error al cargar los puestos de venta");
      })
      .finally(() => setLoading(false));
  }, [pageNumber, pageSize, nombre, refreshKey]);

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pageNumber={pageNumber}
        pageSize={pageSize}
        pageCount={pageCount}
        onPageChange={setPageNumber}
        onPageSizeChange={setPageSize}
        searchValue={nombre}
        onSearchChange={setNombre}
        filterKey="nombre"
        filterLabel="puesto"
        addDialog={() => setAddDialog(true)}
      />

      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar puesto de venta</DialogTitle>
            <DialogDescription>
              Complete el formulario para agregar un puesto de venta.
            </DialogDescription>
          </DialogHeader>
          <SalesStallForm closeModal={() => setAddDialog(false)} onStandAdded={triggerRefresh} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SalesStalls;
