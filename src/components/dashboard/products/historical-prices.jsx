import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LoaderCircle } from "lucide-react";

function HistoricalPrices({ productoNegocioId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fechaLunes = "2025-06-16T00:00:00-03:00";
  const fechaHoy = new Date().toISOString();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/price/history/bybusinessproduct/${productoNegocioId}`, {
        params: { fechaDesde: fechaLunes, fechaHasta: fechaHoy },
      })
      .then((res) => {
        const { data } = res.data;
        setData(data);
        console.log(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <LoaderCircle className="h-4 w-4 animate-spin mx-auto my-5" />
      </div>
    );
  }

  if (!loading && data.length < 2) {
    return (
      <div className="my-5">
        <p className="text-center text-muted-foreground">
          El producto no cuenta con un historico de precios.
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="fechaDesde"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })
          }
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value) => [
            new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 0,
            }).format(value),
            "Precio",
          ]}
          labelFormatter={(label) =>
            new Date(label).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })
          }
          contentStyle={{
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
          }}
        />
        <Line
          type="monotone"
          dataKey="valor"
          stroke="#8884d8"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default HistoricalPrices;
