import { useStore } from "@yoki/react";
import { productsStore } from "../store/product";
import { addToCart } from "../store/cart";

export const ProductList = () => {
  const { items, loading, error, filters } = useStore(productsStore);

  console.info(111);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredProducts = items.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.inStock && !product.inStock) return false;
    if (
      product.price < filters.priceRange.min ||
      product.price > filters.priceRange.max
    )
      return false;
    return true;
  });

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};
