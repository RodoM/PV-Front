import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, PackageMinus, Users } from "lucide-react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Fake data for KPIs
const kpiData = {
  totalSales: "$1,234,567",
  totalEmployees: "128",
  totalProducts: "456",
  productsOutOfStock: "23",
};

// Fake data for monthly sales chart
const monthlySalesData = [
  { month: "Ene", sales: 65000 },
  { month: "Feb", sales: 59000 },
  { month: "Mar", sales: 80000 },
  { month: "Abr", sales: 81000 },
  { month: "May", sales: 56000 },
  { month: "Jun", sales: 55000 },
  { month: "Jul", sales: 40000 },
  { month: "Ago", sales: 70000 },
  { month: "Sep", sales: 90000 },
  { month: "Oct", sales: 110000 },
  { month: "Nov", sales: 95000 },
  { month: "Dic", sales: 120000 },
];

// Format currency
const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function Dashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 sm:gap-8 md:gap-6">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalSales}</div>
            <p className="text-xs text-muted-foreground">+20.1% este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empleados totales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">+3 este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos totales</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.totalProducts}</div>
            <p className="text-xs text-muted-foreground">+12 este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos sin stock</CardTitle>
            <PackageMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.productsOutOfStock}</div>
            <p className="text-xs text-muted-foreground">-5 este mes</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Ventas mensuales (2025)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Ventas"]}
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Productos más vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Caja de tornillos 8x1", sales: 1234, percentage: 45 },
                { name: "Martillo carpintero Stanley", sales: 876, percentage: 32 },
                { name: "Destornillador Phillips", sales: 543, percentage: 20 },
                { name: "Metro flexible 5m", sales: 432, percentage: 15 },
              ].map((product) => (
                <div className="flex items-center" key={product.name}>
                  <div className="w-1/3 font-medium">{product.name}</div>
                  <div className="w-1/3 text-right">{product.sales} unidades</div>
                  <div className="w-1/3 pl-4">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${product.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsBarChart
                data={[
                  { name: "Electronics", value: 45 },
                  { name: "Clothing", value: 30 },
                  { name: "Home", value: 15 },
                  { name: "Other", value: 10 },
                ]}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Percentage"]}
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
