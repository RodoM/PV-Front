import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

export function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= product.stock) {
      onAddToCart(product, quantity);
      setQuantity(1);
    }
  };

  const handleQuantityChange = (value) => {
    const num = Number.parseInt(value) || 0;
    if (num >= 0 && num <= product.stock) {
      setQuantity(num);
    }
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent>
        <div className="aspect-square relative mb-3 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="object-cover"
          />
        </div>

        <div className="space-y-2">
          <div>
            <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
            <p className="text-xs text-gray-600">{product.brand}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            <span className="text-xs text-gray-500">Stock: {product.stock}</span>
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="w-16 h-8 text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <Button
              onClick={handleAddToCart}
              disabled={quantity === 0 || quantity > product.stock}
              size="sm"
              className="flex-1"
            >
              <Plus className="w-4 h-4 md:mr-1" />
              <span className="hidden md:block">Agregar</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
