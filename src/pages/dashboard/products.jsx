import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useRefresh } from "@/providers/refresh-context";
import DataTable from "@/components/ui/data-table";
import { columns } from "@/components/dashboard/products/columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ProductForm from "@/components/dashboard/products/product-form";

function Products() {
  const [addDialog, setAddDialog] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { refreshKey, triggerRefresh } = useRefresh();

  useEffect(() => {
    setLoading(true);
    api
      .get("/businessproduct/list", { params: { pageNumber, pageSize, nombre } })
      .then((res) => {
        const { data } = res.data;
        setData(data.data);
        setPageCount(data.totalPages);
        console.log(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [pageNumber, pageSize, nombre, refreshKey]);

  return (
    <>
      <DataTable
        columns={columns}
        loading={loading}
        data={data}
        pageSize={pageSize}
        pageNumber={pageNumber}
        pageCount={pageCount}
        searchValue={nombre}
        onPageChange={(pageNumber) => setPageNumber(pageNumber)}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
        onSearchChange={setNombre}
        filterKey="nombre"
        filterLabel="producto"
        addDialog={() => setAddDialog(true)}
      />

      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent className="h-screen md:h-auto md:max-h-[500px] 2xl:max-h-[650px] overflow-y-auto scrollable">
          <DialogHeader>
            <DialogTitle>Agregar producto</DialogTitle>
            <DialogDescription>Complete el formulario para agregar un producto.</DialogDescription>
          </DialogHeader>
          <ProductForm onProductAdded={triggerRefresh} closeModal={() => setAddDialog(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Products;
