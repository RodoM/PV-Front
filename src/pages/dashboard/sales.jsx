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
    cliente: "Matias Alberto Ruiz",
    fecha: "03-01-2025",
    enabled: true,
  },
  {
    id: 2,
    name: "Martillo carpintero Stanley",
    cantidad: 1,
    price: 1500,
    cliente: "Emanuel Thomas Camacho",
    fecha: "15-10-23",
    enabled: false,
  },
  {
    id: 3,
    name: "Destornillador Phillips",
    cantidad: 2,
    price: 350,
    cliente: "Keila Pagano",
    fecha: "19-04-23",
    enabled: true,
  },
  {
    id: 4,
    name: "Metro flexible 5m",
    cantidad: 3,
    price: 800,
    ciente: "Candela Burgos",
    fecha: "28-10-20",
    enabled: false,
  },
  {
    id: 5,
    name: "Pintura látex blanca 20L",
    cantidad: 4,
    price: 5000,
    ciente: "Rodolfo Meroi",
    fecha: "13-01-21",
    enabled: true,
  },
  {
    id: 6,
    name: "Taladro eléctrico 750W",
    cantidad: 1,
    price: 12000,
    ciente: "Jenson Medina",
    fecha: "19-11-25",
    enabled: false,
  },
  {
    id: 7,
    name: "Llave ajustable 12",
    cantidad: 5,
    price: 950,
    ciente: "Valentin Lanfranco",
    fecha: "13-02-24",
    enabled: true,
  },
  {
    id: 8,
    name: "Cinta aislante negra",
    cantidad: 10,
    price: 200,
    ciente: "Mateo Fux",
    fecha: "06-02-25",
    enabled: false,
  },
  {
    id: 9,
    name: "Sierra circular 7¼",
    cantidad: 5,
    price: 15000,
    ciente: "Bruno Rubini",
    fecha: "16-05-24",
    enabled: true,
  },
  {
    id: 10,
    name: "Nivel de burbuja 60cm",
    cantidad: 2,
    price: 1200,
    ciente: "Mateo Regis",
    fecha: "22-12-24",
    enabled: false,
  },
  {
    id: 11,
    name: "Juego de llaves Allen",
    cantidad: 4,
    price: 1800,
    ciente: "Felipe Gonzalez",
    fecha: "23-04-25",
    enabled: true,
  },
  {
    id: 12,
    name: "Brocha 4",
    cantidad: 3,
    price: 450,
    ciente: "Gaston Jimenez",
    fecha: "30-10-24",
    enabled: false,
  },
  {
    id: 13,
    name: "Pala punta redonda",
    cantidad: 2,
    price: 2500,
    ciente: "Juan Gonzalez",
    fecha: "11-12-23",
    enabled: true,
  },
  {
    id: 14,
    name: "Cemento Portland 50kg",
    cantidad: 7,
    price: 1200,
    ciente: "Martina Garcia",
    fecha: "27-07-25",
    enabled: false,
  },
  {
    id: 15,
    name: "Guantes de trabajo",
    cantidad: 3,
    price: 600,
    ciente: "Pilar Hugo",
    fecha: "19-01-24",
    enabled: true,
  },
  {
    id: 16,
    name: "Cable eléctrico 2.5mm (m)",
    cantidad: 2,
    price: 180,
    ciente: "Rocio Muñoz",
    fecha: "24-10-21",
    enabled: false,
  },
  {
    id: 17,
    name: "Escalera aluminio 6 escalones",
    cantidad: 2,
    price: 8500,
    ciente: "Daniel Garcia",
    fecha: "28-11-22",
    enabled: true,
  },
  {
    id: 18,
    name: "Candado reforzado 50mm",
    cantidad: 4,
    price: 950,
    ciente: "Horacio Marco",
    fecha: "22-02-22",
    enabled: false,
  },
  {
    id: 19,
    name: "Silicona transparente 280ml",
    cantidad: 4,
    price: 750,
    ciente: "Marcos Giacobbe",
    fecha: "08-01-25",
    enabled: true,
  },
  {
    id: 20,
    name: "Juego de brocas HSS",
    cantidad: 5,
    price: 2800,
    ciente: "Gustavo Garcia",
    fecha: "02-03-25",
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
