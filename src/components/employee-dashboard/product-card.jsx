import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { tipoUnidadMedidas, unidadesCompatibles } from "@/enums/index";

export function ProductCard({ cartItems, product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [tipoUnidadMedida, setTipoUnidadMedida] = useState(
    tipoUnidadMedidas[product.tipoUnidadMedida]
  );

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart(
        {
          ...product,
          tipoUnidadMedida: tipoUnidadMedidas[product.tipoUnidadMedida],
          unidadSeleccionada: tipoUnidadMedida,
        },
        quantity
      );
      setQuantity(1);
    }
  };

  const handleQuantityChange = (value) => {
    const num = Number.parseFloat(value) || 0;
    if (num >= 0) {
      setQuantity(num);
    }
  };

  const isDisabled = cartItems.some((item) => item.productoNegocioId === product.productoNegocioId);

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent>
        <div className="aspect-square relative mb-3 rounded-lg overflow-hidden">
          <img
            src={product.imagenUrl || "/images/placeholder.svg"}
            alt={product.nombre}
            className="object-cover"
          />
        </div>

        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-sm line-clamp-2">{product.nombre}</h3>
            <p className="text-xs text-muted-foreground">{product.marca.nombre}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <span className="font-bold text-lg">${product.precioActivo}</span>
            <span className="text-xs text-muted-foreground">
              {product.stockActual > 0
                ? `Stock: ${product.stockActual} ${product.tipoUnidadMedida.toLowerCase()}`
                : "Sin stock"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="1"
              step="any"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="w-16 h-8 text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button onClick={handleAddToCart} size="sm" className="flex-1">
              <Plus className="w-4 h-4 md:mr-1" />
              <span className="hidden md:block">Agregar</span>
            </Button>
          </div>

          <Select
            onValueChange={(value) => setTipoUnidadMedida(Number(value))}
            defaultValue={tipoUnidadMedidas[product.tipoUnidadMedida].toString()}
            disabled={isDisabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione la u. de medida" />
            </SelectTrigger>
            <SelectContent>
              {unidadesCompatibles[product.tipoUnidadMedida].map((unidad) => (
                <SelectItem key={unidad} value={tipoUnidadMedidas[unidad].toString()}>
                  {unidad}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
