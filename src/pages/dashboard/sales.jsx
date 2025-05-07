import { useState } from "react";
import DataTable from "@/components/ui/data-table";
import { columns } from "@/components/dashboard/sales/sales-columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import SalesForm from "@/components/dashboard/sales/sales-form";

const data = [
  {
    id: 1,
    name: "Caja de tornillos 8x1",
    cantidad: 2,
    price: 100,
    enabled: true,
  },
  {
    id: 2,
    name: "Martillo carpintero Stanley",
    cantidad: 1,
    price: 1500,
    enabled: false,
  },
  {
    id: 3,
    name: "Destornillador Phillips",
    cantidad: 2,
    price: 350,
    enabled: true,
  },
  {
    id: 4,
    name: "Metro flexible 5m",
    cantidad: 3,
    price: 800,
    enabled: false,
  },
  {
    id: 5,
    name: "Pintura látex blanca 20L",
    cantidad: 4,
    price: 5000,
    enabled: true,
  },
  {
    id: 6,
    name: "Taladro eléctrico 750W",
    cantidad: 1,
    price: 12000,
    enabled: false,
  },
  {
    id: 7,
    name: "Llave ajustable 12",
    cantidad: 5,
    price: 950,
    enabled: true,
  },
  {
    id: 8,
    name: "Cinta aislante negra",
    cantidad: 10,
    price: 200,
    enabled: false,
  },
  {
    id: 9,
    name: "Sierra circular 7¼",
    cantidad: 5,
    price: 15000,
    enabled: true,
  },
  {
    id: 10,
    name: "Nivel de burbuja 60cm",
    cantidad: 2,
    price: 1200,
    enabled: false,
  },
  {
    id: 11,
    name: "Juego de llaves Allen",
    cantidad: 4,
    price: 1800,
    enabled: true,
  },
  {
    id: 12,
    name: "Brocha 4",
    cantidad: 3,
    price: 450,
    enabled: false,
  },
  {
    id: 13,
    name: "Pala punta redonda",
    cantidad: 2,
    price: 2500,
    enabled: true,
  },
  {
    id: 14,
    name: "Cemento Portland 50kg",
    cantidad: 7,
    price: 1200,
    enabled: false,
  },
  {
    id: 15,
    name: "Guantes de trabajo",
    cantidad: 3,
    price: 600,
    enabled: true,
  },
  {
    id: 16,
    name: "Cable eléctrico 2.5mm (m)",
    cantidad: 2,
    price: 180,
    enabled: false,
  },
  {
    id: 17,
    name: "Escalera aluminio 6 escalones",
    cantidad: 2,
    price: 8500,
    enabled: true,
  },
  {
    id: 18,
    name: "Candado reforzado 50mm",
    cantidad: 4,
    price: 950,
    enabled: false,
  },
  {
    id: 19,
    name: "Silicona transparente 280ml",
    cantidad: 4,
    price: 750,
    enabled: true,
  },
  {
    id: 20,
    name: "Juego de brocas HSS",
    cantidad: 5,
    price: 2800,
    enabled: false,
  },
];

function Sales() {
  const [addDialog, setAddDialog] = useState(false);

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        filterKey="name"
        filterLabel="venta"
        addDialog={() => setAddDialog(true)}
      />

      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar venta</DialogTitle>
            <DialogDescription>Complete el formulario para agregar una venta.</DialogDescription>
          </DialogHeader>
          <SalesForm closeModal={() => setAddDialog(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Sales;
