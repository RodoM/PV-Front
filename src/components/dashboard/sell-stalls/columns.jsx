import { Link } from "react-router-dom";

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
  {
    header: "Acciones",
    id: "acciones",
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Link to={`/puestos/${id}`}>
          <button className="text-blue-600 hover:underline">Ir al Puesto</button>
        </Link>
      );
    },
  },
];
