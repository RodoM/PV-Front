import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const data = [
  {
    id: 1,
    name: "Caja de tornillos 8x1",
    stock: 150,
    price: 100,
    enabled: true,
  },
  {
    id: 2,
    name: "Martillo carpintero Stanley",
    stock: 25,
    price: 1500,
    enabled: false,
  },
  {
    id: 3,
    name: "Destornillador Phillips",
    stock: 45,
    price: 350,
    enabled: true,
  },
  {
    id: 4,
    name: "Metro flexible 5m",
    stock: 30,
    price: 800,
    enabled: false,
  },
  {
    id: 5,
    name: "Pintura látex blanca 20L",
    stock: 15,
    price: 5000,
    enabled: true,
  },
  {
    id: 6,
    name: "Taladro eléctrico 750W",
    stock: 8,
    price: 12000,
    enabled: false,
  },
  {
    id: 7,
    name: "Llave ajustable 12",
    stock: 20,
    price: 950,
    enabled: true,
  },
  {
    id: 8,
    name: "Cinta aislante negra",
    stock: 100,
    price: 200,
    enabled: false,
  },
  {
    id: 9,
    name: "Sierra circular 7¼",
    stock: 6,
    price: 15000,
    enabled: true,
  },
  {
    id: 10,
    name: "Nivel de burbuja 60cm",
    stock: 18,
    price: 1200,
    enabled: false,
  },
  {
    id: 11,
    name: "Juego de llaves Allen",
    stock: 25,
    price: 1800,
    enabled: true,
  },
  {
    id: 12,
    name: "Brocha 4",
    stock: 40,
    price: 450,
    enabled: false,
  },
  {
    id: 13,
    name: "Pala punta redonda",
    stock: 12,
    price: 2500,
    enabled: true,
  },
  {
    id: 14,
    name: "Cemento Portland 50kg",
    stock: 75,
    price: 1200,
    enabled: false,
  },
  {
    id: 15,
    name: "Guantes de trabajo",
    stock: 50,
    price: 600,
    enabled: true,
  },
  {
    id: 16,
    name: "Cable eléctrico 2.5mm (m)",
    stock: 200,
    price: 180,
    enabled: false,
  },
  {
    id: 17,
    name: "Escalera aluminio 6 escalones",
    stock: 10,
    price: 8500,
    enabled: true,
  },
  {
    id: 18,
    name: "Candado reforzado 50mm",
    stock: 35,
    price: 950,
    enabled: false,
  },
  {
    id: 19,
    name: "Silicona transparente 280ml",
    stock: 60,
    price: 750,
    enabled: true,
  },
  {
    id: 20,
    name: "Juego de brocas HSS",
    stock: 15,
    price: 2800,
    enabled: false,
  },
];

function SalesStall() {
  const { id } = useParams(); // ← id del puesto desde la URL
  const navigate = useNavigate();

  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const productosHabilitados = data.filter((prod) => prod.enabled);

  const agregarProducto = (producto) => {
    setProductosSeleccionados((prev) => {
      const yaExiste = prev.find((p) => p.id === producto.id);
      if (yaExiste) return prev;
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    setProductosSeleccionados((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad: nuevaCantidad } : p))
    );
  };

  const eliminarProducto = (id) => {
    setProductosSeleccionados((prev) => prev.filter((p) => p.id !== id));
  };

  const subtotal = productosSeleccionados.reduce(
    (acc, prod) => acc + prod.price * prod.cantidad,
    0
  );
  const total = subtotal * 1.21;

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
      >
        ← Volver
      </button>

      <h2 className="text-xl font-bold mb-4">Punto de Venta - Puesto #{id}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        {productosHabilitados.map((producto) => (
          <div
            key={producto.id}
            className="border p-3 rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => agregarProducto(producto)}
          >
            <p className="font-semibold">{producto.name}</p>
            <p>Stock: {producto.stock}</p>
            <p>${producto.price}</p>
          </div>
        ))}
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <button className="fixed bottom-4 right-4 px-5 py-3 bg-green-600 text-white rounded shadow-lg">
            Ver Carrito ({productosSeleccionados.length})
          </button>
        </SheetTrigger>

        <SheetContent side="right" className="w-[400px] sm:w-[500px] p-3">
          <SheetHeader>
            <SheetTitle>Tu carrito</SheetTitle>
          </SheetHeader>

          {productosSeleccionados.length === 0 ? (
            <p className="mt-4 text-gray-500">No hay productos en el carrito.</p>
          ) : (
            <div className="mt-4 flex flex-col justify-between h-full">
              <ul className="space-y-3 overflow-y-auto">
                {productosSeleccionados.map((prod) => (
                  <li key={prod.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium">{prod.name}</p>
                      <p className="text-sm text-gray-600">${prod.price}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <input
                        type="number"
                        min="1"
                        value={prod.cantidad}
                        onChange={(e) => cambiarCantidad(prod.id, Number(e.target.value))}
                        className="w-16 border rounded px-2 py-1"
                      />
                      <button
                        onClick={() => eliminarProducto(prod.id)}
                        className="text-red-500 hover:text-red-700 text-lg font-bold"
                        title="Quitar producto"
                      >
                        X
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t pt-4">
                <p className="text-right">Subtotal: ${subtotal.toFixed(2)}</p>
                <p className="text-right font-bold">Total: ${total.toFixed(2)}</p>
                <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded">
                  Confirmar Compra
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default SalesStall;
