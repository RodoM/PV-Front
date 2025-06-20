import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { tipoUnidadMedidas, factoresConversion } from "@/enums/index";

export function CartItemComponent({ item, importe, onUpdateQuantity, onRemoveItem }) {
  const obtenerUnidad = (unidad) => {
    return Object.keys(tipoUnidadMedidas).find((key) => tipoUnidadMedidas[key] === unidad);
  };

  const calcularStockDisponible = () => {
    const factor =
      factoresConversion[obtenerUnidad(item.tipoUnidadMedida)]?.[
        obtenerUnidad(item.unidadSeleccionada)
      ] ?? 1;
    return Math.floor(item.stockActual * factor);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.productoNegocioId, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (item.quantity <= calcularStockDisponible()) {
      onUpdateQuantity(item.productoNegocioId, item.quantity + 1);
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg">
      <div className="hidden sm:block w-12 h-12 relative bg-gray-100 rounded overflow-hidden flex-shrink-0">
        <img
          src={item.imagenUrl || "/images/placeholder.svg"}
          alt={item.nombre}
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm line-clamp-1">{item.nombre}</h4>
        <p className="text-xs text-muted-foreground">{item.marcaId}</p>
        <p className="font-semibold text-sm">${importe}</p>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDecrease}
          disabled={item.quantity <= 1}
          className="w-8 h-8 p-0"
        >
          <Minus className="w-3 h-3" />
        </Button>

        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>

        <Button
          variant="outline"
          size="sm"
          onClick={handleIncrease}
          disabled={item.quantity >= calcularStockDisponible()}
          className="w-8 h-8 p-0"
        >
          <Plus className="w-3 h-3" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onRemoveItem(item.productoNegocioId)}
          className="w-8 h-8 p-0 ml-2 text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
