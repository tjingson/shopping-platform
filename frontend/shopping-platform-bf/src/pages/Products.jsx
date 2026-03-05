import { useEffect, useState } from "react";
import API from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Loading products...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Products
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">
          No products available.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {product.name}
              </h2>

              <p className="text-gray-600 mb-4">
                {product.description}
              </p>

              <p className="font-bold text-lg">
                ${product.price}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Stock: {product.stock}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;