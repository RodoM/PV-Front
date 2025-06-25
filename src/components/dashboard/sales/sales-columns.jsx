import { ArrowUpDown } from "lucide-react";
import ActionCell from "./sales-action-cell";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";

export const columns = [
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
    accesorKey: "empleado.nombre",
    header: "Empleado",
    cell: ({ row }) => {
      if (!row.original) return "Sin empleado";
      return (
        <div>
          {row.original.empleado.nombre} {row.original.empleado.apellido}
        </div>
      );
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
          Productos vendidos (distintos)
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
          Importe
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
    accessorKey: "tipo",
    header: "Tipo",
    cell: ({ row }) => {
      const tipo = row.original?.comprobante?.tipoComprobante;

      if (tipo === "ComprobanteVenta") {
        return (
          <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
            <BadgeCheckIcon className="mr-1 h-4 w-4" />
            Venta
          </Badge>
        );
      }

      if (tipo === "ConsumoInterno") {
        return <Badge variant="outline">Consumo</Badge>;
      }

      return <Badge variant="outline">Desconocido</Badge>;
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const comprobanteAnulacion = row.original?.comprobanteAnulacion;
      const estado = comprobanteAnulacion ? "Anulada" : "Confirmada";
      const variant = comprobanteAnulacion ? "inactive" : "active";
      return <Badge variant={variant}>{estado}</Badge>;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
