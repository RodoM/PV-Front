import React from "react";
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function EmployeeOfTheMonth({ sales }) {
  const currentMonth = new Date().toLocaleString("es-AR", { month: "long" }).toLowerCase();

  const ventasMesActual = sales[currentMonth]?.ventas ?? [];

  const ventasPorEmpleado = ventasMesActual.reduce((acc, venta) => {
    const id = venta.empleadoId ?? "Desconocido";
    acc[id] = (acc[id] ?? 0) + venta.total;
    return acc;
  }, {});

  const [mejorEmpleadoId, montoMayor] = Object.entries(ventasPorEmpleado).reduce(
    (max, actual) => (actual[1] > max[1] ? actual : max),
    [null, 0]
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
        <div className="text-2xl font-bold">
          {mejorEmpleadoId !== "Desconocido" ? `ID ${mejorEmpleadoId}` : "Desconocido"}
        </div>
        <p className="text-xs text-muted-foreground">{formatoARS.format(montoMayor)} en ventas</p>
      </CardContent>
    </Card>
  );
}

export default EmployeeOfTheMonth;
