import { useState, useEffect, useMemo } from "react";
import api from "@/lib/axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTheme } from "@/providers/theme-provider";
import { useRefresh } from "@/providers/refresh-context";
import { Input } from "@/components/ui/input";
import { Moon, Sun, Search, LoaderCircle } from "lucide-react";
import { BarcodeScanner } from "@/components/employee-dashboard/barcode-scanner";
import { ProductList } from "@/components/employee-dashboard/product-list";
import { CartSummary } from "@/components/employee-dashboard/cart-summary";
import { Button } from "@/components/ui/button";

export default function PuntoDeVenta() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { theme, setTheme } = useTheme();
  const { refreshKey, triggerRefresh } = useRefresh();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setLoading(true);
    api
      .get("/businessproduct/list", {
        params: { pageNumber: 1, pageSize: 1000 },
      })
      .then((res) => {
        const { data } = res.data;
        setData(data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const filteredProducts = useMemo(() => {
    return data.filter(
      (product) =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.marca.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleAddToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productoNegocioId === product.productoNegocioId
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.productoNegocioId === product.productoNegocioId
            ? { ...item, quantity: Math.min(item.quantity + quantity, item.stockActual) }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.productoNegocioId === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.productoNegocioId !== id));
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen p-4">
      <header className="flex items-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Puesto "{searchParams.get("name")}"</h1>
        <Button variant="outline" className="ml-auto mr-4" onClick={() => navigate("/puestos/")}>
          Salir del puesto
        </Button>
        <Button variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
        <div className="lg:col-span-2 rounded-lg shadow-sm p-6 overflow-hidden flex flex-col">
          <div className="mb-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar productos por nombre o marca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <BarcodeScanner products={data} onAddToCart={handleAddToCart} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <LoaderCircle className="h-4 w-4 animate-spin mx-auto my-5" />
              </div>
            ) : !data.length ? (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <p className="text-lg">No hay productos disponibles</p>
                  <p className="text-sm">Agrega productos para comenzar</p>
                </div>
              </div>
            ) : (
              <ProductList
                cartItems={cartItems}
                products={filteredProducts}
                onAddToCart={handleAddToCart}
              />
            )}
          </div>
        </div>

        <div className="rounded-lg shadow-sm p-6 overflow-hidden">
          <CartSummary
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onConfirmPurchase={() => {
              setCartItems([]);
              triggerRefresh();
            }}
          />
        </div>
      </div>
    </div>
  );
}
