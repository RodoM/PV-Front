import { useState } from "react";
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

const data = [
  {
    id: 1,
    name: "Caja de tornillos 8x1",
    stock: 150,
    price: 100,
    enabled: true,
  },
  {
    id: 2,
    name: "Martillo carpintero Stanley",
    stock: 25,
    price: 1500,
    enabled: false,
  },
  {
    id: 3,
    name: "Destornillador Phillips",
    stock: 45,
    price: 350,
    enabled: true,
  },
  {
    id: 4,
    name: "Metro flexible 5m",
    stock: 30,
    price: 800,
    enabled: false,
  },
  {
    id: 5,
    name: "Pintura látex blanca 20L",
    stock: 15,
    price: 5000,
    enabled: true,
  },
  {
    id: 6,
    name: "Taladro eléctrico 750W",
    stock: 8,
    price: 12000,
    enabled: false,
  },
  {
    id: 7,
    name: "Llave ajustable 12",
    stock: 20,
    price: 950,
    enabled: true,
  },
  {
    id: 8,
    name: "Cinta aislante negra",
    stock: 100,
    price: 200,
    enabled: false,
  },
  {
    id: 9,
    name: "Sierra circular 7¼",
    stock: 6,
    price: 15000,
    enabled: true,
  },
  {
    id: 10,
    name: "Nivel de burbuja 60cm",
    stock: 18,
    price: 1200,
    enabled: false,
  },
  {
    id: 11,
    name: "Juego de llaves Allen",
    stock: 25,
    price: 1800,
    enabled: true,
  },
  {
    id: 12,
    name: "Brocha 4",
    stock: 40,
    price: 450,
    enabled: false,
  },
  {
    id: 13,
    name: "Pala punta redonda",
    stock: 12,
    price: 2500,
    enabled: true,
  },
  {
    id: 14,
    name: "Cemento Portland 50kg",
    stock: 75,
    price: 1200,
    enabled: false,
  },
  {
    id: 15,
    name: "Guantes de trabajo",
    stock: 50,
    price: 600,
    enabled: true,
  },
  {
    id: 16,
    name: "Cable eléctrico 2.5mm (m)",
    stock: 200,
    price: 180,
    enabled: false,
  },
  {
    id: 17,
    name: "Escalera aluminio 6 escalones",
    stock: 10,
    price: 8500,
    enabled: true,
  },
  {
    id: 18,
    name: "Candado reforzado 50mm",
    stock: 35,
    price: 950,
    enabled: false,
  },
  {
    id: 19,
    name: "Silicona transparente 280ml",
    stock: 60,
    price: 750,
    enabled: true,
  },
  {
    id: 20,
    name: "Juego de brocas HSS",
    stock: 15,
    price: 2800,
    enabled: false,
  },
];

function Products() {
  const [addDialog, setAddDialog] = useState(false);

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        filterKey="name"
        filterLabel="producto"
        addDialog={() => setAddDialog(true)}
      />

      <Dialog open={addDialog} onOpenChange={setAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar producto</DialogTitle>
            <DialogDescription>Complete el formulario para agregar un producto.</DialogDescription>
          </DialogHeader>
          <ProductForm closeModal={() => setAddDialog(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Products;
