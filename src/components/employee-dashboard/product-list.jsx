import { ProductCard } from "./product-card";

export function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <p className="text-lg">No se encontraron productos</p>
          <p className="text-sm">Intenta con otro término de búsqueda</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
