import ActionCell from "./action-cell";
import { Badge } from "@/components/ui/badge";

export const columns = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "apellido",
    header: "Apellido",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "tipoUsuario",
    header: "Rol",
    cell: ({ row }) => {
      const role = row.original.tipoUsuario === "Seller" ? "Vendedor" : "Administrador";
      return <div>{role}</div>;
    },
  },
  {
    accessorKey: "fechaAlta",
    header: "Fecha alta",
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
    accessorKey: "activo",
    header: "Estado",
    cell: ({ row }) => {
      const status = row.original.activo ? "Activo" : "Inactivo";
      return <Badge variant={row.original.activo ? "active" : "inactive"}>{status}</Badge>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
