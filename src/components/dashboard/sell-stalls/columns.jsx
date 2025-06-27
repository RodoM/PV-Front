import ActionCell from "../sell-stalls/sales-stall-action-cell";

export const columns = [
  {
    header: "Nombre",
    accessorKey: "nombre",
  },
  {
    header: "Fecha Creación",
    accessorKey: "fechaAlta",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
