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
    header: "Habilitado",
    accessorKey: "enabled",
    cell: ({ row }) => (row.original.enabled ? "Sí" : "No"), // Mostrar "Sí" o "No"
  },
];
