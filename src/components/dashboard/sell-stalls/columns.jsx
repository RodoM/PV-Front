import ActionCell from "../sell-stalls/sales-stall-action-cell";

export const columns = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Nombre",
    accessorKey: "nombre",
  },
  {
    header: "Direccion IP",
    accessorKey: "direccionIP",
  },
  {
    header: "Direcion MAC",
    accessorKey: "direccionMAC",
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
