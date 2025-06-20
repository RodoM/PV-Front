import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function obtenerTopProductosPorFrecuencia(ventas, limite = 10) {
  const frecuencia = {};

  for (const venta of ventas) {
    for (const detalle of venta.detalles) {
      const key = `${detalle.productoNegocioId}-${detalle.nombreProducto}`;

      if (!frecuencia[key]) {
        frecuencia[key] = {
          producto: detalle.nombreProducto,
          veces: 0,
        };
      }

      frecuencia[key].veces++;
    }
  }

  return Object.values(frecuencia)
    .sort((a, b) => b.veces - a.veces)
    .slice(0, limite);
}

function TopProducts({ sales }) {
  const todasLasVentas = Object.values(sales).flatMap((mes) => mes.ventas || []);
  const topProductos = obtenerTopProductosPorFrecuencia(todasLasVentas);

  console.log(topProductos);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top productos más vendidos</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            accessibilityLayer
            data={topProductos}
            margin={{
              top: 20,
              left: 20,
              right: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="producto"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              label={{
                value: "Cantidad de veces",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle" },
              }}
            />
            <Bar dataKey="veces" fill="var(--color-veces)" radius={[4, 4, 0, 0]} maxBarSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default TopProducts;
