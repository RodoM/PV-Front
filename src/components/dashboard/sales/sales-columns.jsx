import { ArrowUpDown } from "lucide-react";
import ActionCell from "./sales-action-cell";

// sacar la busqueda
// boton de agregar venta

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "fechaAlta",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      if (!row.original || !row.original.fechaAlta) return "Sin fecha";
      const fecha = new Date(row.original.fechaAlta);
      return fecha.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "detalles",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cantidad de productos
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      if (!row.original || !row.original.detalles) return 0;
      return row.original.detalles.length;
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      if (!row.original) return "$0.00";
      const formatoARS = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
      });
      return formatoARS.format(row.original.total || 0);
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
