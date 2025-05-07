import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ActionCell from "./sales-action-cell";

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "cantidad",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cantidad
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const formatoARS = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
      });

      return formatoARS.format(row.original.price);
    },
  },
  {
    accessorKey: "enabled",
    header: "Estado",
    cell: ({ row }) => {
      const state = row.original.enabled ? "active" : "inactive";
      return <Badge variant={state}>{row.original.enabled ? "Activo" : "Inactivo"}</Badge>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
