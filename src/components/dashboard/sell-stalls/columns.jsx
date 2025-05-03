export const columns = [
  {
    header: "Nombre",
    accessorKey: "name",
  },
  {
    header: "Ubicación",
    accessorKey: "location",
  },
  {
    header: "Estado",
    accessorKey: "enabled",
    cell: ({ row }) => (row.original.enabled ? "active" : "inactive"),
  },
];
