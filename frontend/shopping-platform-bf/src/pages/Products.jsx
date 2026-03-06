import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";


function Products() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(search.toLowerCase())
);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      console.log(user); 
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (product) => {
    navigate(`/edit-product/${product._id}`);
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500 text-sm">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />

          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/create-product")}
              className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 shadow"
            >
              + Add Product
            </button>
          )}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">No products yet</p>
          <p className="text-sm">Click "Add Product" to create one.</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">No products found</p>
          <p className="text-sm">Try a different search.</p>
        </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;