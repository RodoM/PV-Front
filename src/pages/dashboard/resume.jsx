import { useState, useEffect } from "react";
import api from "@/lib/axios";
import MonthSales from "@/components/dashboard/resume/month-sales";
import EmployeeOfTheMonth from "@/components/dashboard/resume/employee-of-the-month";
import TotalProducts from "@/components/dashboard/resume/total-products";
import MonthlySalesChart from "@/components/dashboard/resume/monthly-sales-chart";
import TopProducts from "@/components/dashboard/resume/top-products";
import { LoaderCircle } from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState([]);

  const salesPerMonth = (sales) => {
    const result = sales.reduce((acumulador, venta) => {
      if (venta.comprobante?.tipoComprobante !== "ComprobanteVenta") {
        return acumulador;
      }

      const fecha = new Date(venta.fechaAlta);
      const mes = fecha.toLocaleString("es-AR", { month: "long" }).toLowerCase();

      if (!acumulador[mes]) {
        acumulador[mes] = {
          total: 0,
          ventas: [],
        };
      }

      acumulador[mes].ventas.push(venta);
      acumulador[mes].total += venta.total || 0;

      return acumulador;
    }, {});
    setSalesData(result);
  };

  useEffect(() => {
    setLoading(true);
    api
      .get("/sale/list", { params: { pageNumber: 1, pageSize: 10000 } })
      .then((response) => {
        const { data } = response.data;
        salesPerMonth(data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex flex-1 flex-col justify-center gap-4 sm:gap-8 md:gap-6">
      {loading ? (
        <LoaderCircle className="mx-auto h-4 w-4 animate-spin" />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <MonthSales sales={salesData} />
            <TotalProducts />
            <EmployeeOfTheMonth sales={salesData} />
          </div>
          <MonthlySalesChart sales={salesData} />
          <TopProducts sales={salesData} />
        </>
      )}
    </main>
  );
}
