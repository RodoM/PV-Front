import { Package } from "lucide-react";
import ActionCell from "./action-cell";

export const columns = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
  },
  {
    accessorKey: "marca.nombre",
    header: "Marca",
  },
  {
    accessorKey: "rubro.nombre",
    header: "Rubro",
  },
  {
    accessorKey: "categoria.nombre",
    header: "Categoría",
  },
  {
    accessorKey: "stockActual",
    header: "Stock",
    cell: ({ row }) => {
      const stockActual = row.original.stockActual;

      return (
        <div className="flex items-center gap-1">
          <Package className="h-4 w-4 text-muted-foreground" />
          {stockActual > 0
            ? `${stockActual} ${row.original.tipoUnidadMedida.toLowerCase()}`
            : "Sin stock"}
        </div>
      );
    },
  },
  {
    accessorKey: "precioActivo",
    header: "Precio",
    cell: ({ row }) => {
      const formatoARS = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
      });

      const hasPrice = row.original.precioActivo !== null;

      return hasPrice ? formatoARS.format(row.original.precioActivo) : "Sin precio";
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
