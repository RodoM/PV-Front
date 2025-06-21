import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function MonthSales({ sales }) {
  const currentMonth = new Date().toLocaleString("es-AR", { month: "long" }).toLowerCase();
  const previousMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))
    .toLocaleString("es-AR", { month: "long" })
    .toLowerCase();

  const salesThisMonth = sales[currentMonth]?.total ?? 0;
  const salesPreviousMonth = sales[previousMonth]?.total ?? 0;

  const salesPercentage =
    salesPreviousMonth > 0
      ? ((salesThisMonth - salesPreviousMonth) / salesPreviousMonth) * 100
      : null;

  const formatoARS = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {sales[currentMonth]?.ventas.length} ventas este mes
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatoARS.format(salesThisMonth)}</div>
        {salesPercentage !== null ? (
          <p className={`text-xs ${salesPercentage >= 0 ? "text-green-600" : "text-red-600"}`}>
            {salesPercentage.toFixed(2)}% {salesPercentage >= 0 ? "más" : "menos"} que el mes
            anterior
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">No hay datos del mes anterior</p>
        )}
      </CardContent>
    </Card>
  );
}

export default MonthSales;
