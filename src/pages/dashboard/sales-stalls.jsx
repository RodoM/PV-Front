import React, { useState } from "react";
import DataTable from "@/components/ui/data-table"; // Componente de tabla
import { columns } from "@/components/dashboard/sell-stalls/columns"; // Define las columnas para los puestos de venta
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import SalesStandForm from "@/components/dashboard/sell-stalls/sales-stand-form"; // Formulario para agregar un puesto de venta

// Datos de ejemplo para los puestos de venta
const salesStalls = [
  {
    id: 1,
    name: "Puesto 1",
    location: "Sector A",
    enabled: true,
  },
  {
    id: 2,
    name: "Puesto 2",
    location: "Sector B",
    enabled: false,
  },
  {
    id: 3,
    name: "Puesto 3",
    location: "Sector C",
    enabled: true,
  },
  // Puedes agregar más puestos aquí
];

function SalesStalls() {
  const [addDialog, setAddDialog] = useState(false);

  return (
    <>
      <div>
        {/* DataTable para los puestos de venta */}
        <DataTable
          columns={columns} // Se deben definir las columnas
          data={salesStalls} // Pasar los datos de los puestos de venta
          filterKey="name" // Filtrar por nombre
          filterLabel="puesto"
          addDialog={() => setAddDialog(true)} // Función para abrir el modal
        />

        {/* Modal para agregar un nuevo puesto de venta */}
        <Dialog open={addDialog} onOpenChange={setAddDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar puesto de venta</DialogTitle>
              <DialogDescription>
                Complete el formulario para agregar un puesto de venta.
              </DialogDescription>
            </DialogHeader>
            <SalesStandForm closeModal={() => setAddDialog(false)} />{" "}
            {/* Componente del formulario */}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default SalesStalls;
