import { ArrowUpDown } from "lucide-react";
import ActionCell from "./action-cell";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "first_name",
    header: "Nombre",
  },
  {
    accessorKey: "last_name",
    header: "Apellido",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Puesto
        <ArrowUpDown className="h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: "hire_date",
    header: "Fecha alta",
  },
  {
    accessorKey: "enabled",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.original.enabled ? "Activo" : "Inactivo";
      return <Badge variant={row.original.enabled ? "active" : "inactive"}>{status}</Badge>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
