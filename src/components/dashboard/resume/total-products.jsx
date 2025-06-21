import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

function TotalProducts() {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    api
      .get("/businessproduct/list", {
        params: { pageNumber: 1, pageSize: 1000 },
      })
      .then((res) => {
        const { data } = res.data;
        setTotalProducts(data.data.length);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Productos totales</CardTitle>
        <Package className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{totalProducts}</div>
      </CardContent>
    </Card>
  );
}

export default TotalProducts;
