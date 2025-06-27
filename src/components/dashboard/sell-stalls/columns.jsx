import ActionCell from "../sell-stalls/sales-stall-action-cell";

export const columns = [
  {
    header: "Nombre",
    accessorKey: "nombre",
  },
  {
    header: "Fecha Creación",
    accessorKey: "fechaAlta",
    cell: ({ row }) => {
      if (!row.original || !row.original.fechaAlta) return "Sin fecha";
      const fecha = new Date(row.original.fechaAlta);
      return fecha.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
