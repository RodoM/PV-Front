import { useState } from "react";
import DataTable from "@/components/ui/data-table";
import { columns } from "@/components/dashboard/employees/employees-columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import EmployeeForm from "@/components/dashboard/employees/employee-form";

const data = [
  {
    id: 1,
    name: "Juan Pérez",
    dni: "30123456",
    position: "Cajero",
    enabled: true,
  },
  {
    id: 2,
    name: "Ana Gómez",
    dni: "29333444",
    position: "Vendedora",
    enabled: false,
  },
  {
    id: 3,
    name: "Carlos Díaz",
    dni: "31222333",
    position: "Supervisor",
    enabled: true,
  },
  {
    id: 4,
    name: "María López",
    dni: "28444555",
    position: "Administrativa",
    enabled: true,
  },
];

function Employees() {
  const [addDialog, setAddDialog] = useState(false);

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        filterKey="name"
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
