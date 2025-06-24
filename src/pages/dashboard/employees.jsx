import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useRefresh } from "@/providers/refresh-context";
import DataTable from "@/components/ui/data-table";
import { columns } from "@/components/dashboard/employees/columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import EmployeeForm from "@/components/dashboard/employees/employee-form";

function Employees() {
  const [addDialog, setAddDialog] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { refreshKey } = useRefresh();

  useEffect(() => {
    setLoading(true);
    api
      .get("/user/list", { params: { pageNumber, pageSize, onlyActive: false } })
      .then((res) => {
        const { data } = res.data;
        setData(data.data);
        setPageCount(data.totalPages);
      })
      .finally(() => setLoading(false));
  }, [pageNumber, pageSize, refreshKey]);

  return (
    <>
      <DataTable
        columns={columns}
        loading={loading}
        data={data}
        pageSize={pageSize}
        pageNumber={pageNumber}
        pageCount={pageCount}
        onPageChange={(pageNumber) => setPageNumber(pageNumber)}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
        filterLabel="empleado"
        addDialog={() => setAddDialog(true)}
      />

      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar empleado</DialogTitle>
            <DialogDescription>
              Complete el formulario para agregar un nuevo empleado.
            </DialogDescription>
          </DialogHeader>
          <EmployeeForm closeModal={() => setAddDialog(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Employees;
