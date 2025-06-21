import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TopEmployeeOfMonth({ sales }) {
  const currentMonth = new Date().toLocaleString("es-AR", { month: "long" }).toLowerCase();

  const ventasMesActual = sales[currentMonth]?.ventas ?? [];

  const ventasPorEmpleado = {};

  for (const venta of ventasMesActual) {
    const empleado = venta.empleado;
    if (!empleado) continue;

    const id = empleado.id;
    if (!ventasPorEmpleado[id]) {
      ventasPorEmpleado[id] = {
        nombreCompleto: `${empleado.nombre} ${empleado.apellido}`,
        total: 0,
      };
    }
    ventasPorEmpleado[id].total += venta.total;
  }

  const topEmpleado = Object.values(ventasPorEmpleado).reduce(
    (max, actual) => (actual.total > max.total ? actual : max),
    { nombreCompleto: "Sin datos", total: 0 }
  );

  const formatoARS = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Empleado del mes</CardTitle>
        <User className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{topEmpleado.nombreCompleto}</div>
        <p className="text-xs text-muted-foreground">
          {formatoARS.format(topEmpleado.total)} en ventas
        </p>
      </CardContent>
    </Card>
  );
}
