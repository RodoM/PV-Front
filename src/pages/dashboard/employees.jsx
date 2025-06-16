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
    first_name: "Juan",
    last_name: "Perez",
    email: "juan@gmail.com",
    position: "Caja 1",
    hire_date: "2022-01-01",
    enabled: true,
  },
  {
    id: 2,
    first_name: "Pedro",
    last_name: "Gonzalez",
    email: "pedro@gmail.com",
    position: "Caja 2",
    hire_date: "2022-01-02",
    enabled: true,
  },
  {
    id: 3,
    first_name: "Carlos",
    last_name: "Ramirez",
    email: "carlos@gmail.com",
    position: "Caja 3",
    hire_date: "2022-01-03",
    enabled: false,
  },
  {
    id: 4,
    first_name: "Luis",
    last_name: "Solis",
    email: "luis@gmail.com",
    position: "Caja 4",
    hire_date: "2022-01-04",
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
