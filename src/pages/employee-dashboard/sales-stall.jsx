import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ProductList } from "@/components/employee-dashboard/product-list";
import { CartSummary } from "@/components/employee-dashboard/cart-summary";
import { toast } from "sonner";

const SAMPLE_PRODUCTS = [
  {
    id: "1",
    name: "Coca Cola 600ml",
    brand: "Coca Cola",
    price: 2.5,
    image: "/placeholder.svg?height=200&width=200",
    stock: 50,
  },
  {
    id: "2",
    name: "Pan Integral",
    brand: "Bimbo",
    price: 3.2,
    image: "/placeholder.svg?height=200&width=200",
    stock: 25,
  },
  {
    id: "3",
    name: "Leche Entera 1L",
    brand: "Lala",
    price: 4.8,
    image: "/placeholder.svg?height=200&width=200",
    stock: 30,
  },
  {
    id: "4",
    name: "Arroz Blanco 1kg",
    brand: "Verde Valle",
    price: 5.5,
    image: "/placeholder.svg?height=200&width=200",
    stock: 40,
  },
  {
    id: "5",
    name: "Aceite de Cocina 1L",
    brand: "Capullo",
    price: 8.9,
    image: "/placeholder.svg?height=200&width=200",
    stock: 20,
  },
  {
    id: "6",
    name: "Huevos 12 piezas",
    brand: "San Juan",
    price: 6.2,
    image: "/placeholder.svg?height=200&width=200",
    stock: 35,
  },
  {
    id: "7",
    name: "Yogurt Natural 1L",
    brand: "Danone",
    price: 7.3,
    image: "/placeholder.svg?height=200&width=200",
    stock: 15,
  },
  {
    id: "8",
    name: "Pasta Espagueti 500g",
    brand: "Barilla",
    price: 4.5,
    image: "/placeholder.svg?height=200&width=200",
    stock: 60,
  },
];

export default function PuntoDeVenta() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleAddToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock) }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleConfirmPurchase = (customer) => {
    console.log("Compra confirmada:", { customer, items: cartItems });

    setCartItems([]);

    toast.success(`¡Compra confirmada para ${customer.name}!`);
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Puesto #</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 overflow-hidden flex flex-col">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar productos por nombre o marca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden">
          <CartSummary
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onConfirmPurchase={handleConfirmPurchase}
          />
        </div>
      </div>
    </div>
  );
}
