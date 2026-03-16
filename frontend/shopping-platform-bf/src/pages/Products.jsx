import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Carousel from "../components/Carousel";
import { useAuth } from "../context/authContext";
import { IMAGE_URL } from "../services/api";

function Products() {
  const { user, login, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  const [showWelcome, setShowWelcome] = useState(false);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!user) return;
    const firstLogin = sessionStorage.getItem("firstLoginShown");

    if (!firstLogin) {
      setShowWelcome(true);
      sessionStorage.setItem("firstLoginShown", "true");
    }
  }, [user]);

  const handleView = (product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
       setSelectedProduct(null);
      }
  };

  window.addEventListener("keydown", handleEsc);

  return () => window.removeEventListener("keydown", handleEsc);
}, []);

  const confirmDelete = async () => {
    try {
      await API.delete(`/products/${deleteProduct._id}`);

      toast.success("Product deleted");

      setDeleteProduct(null);
      fetchProducts();

    } catch (error) {
      toast.error("Failed to delete product");
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
      <Carousel />
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
              onDelete={(product) => setDeleteProduct(product)}
              onEdit={handleEdit}
              onView={handleView}
            />
          ))}
        </div>
      )}

    {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedProduct(null)}
        >
          {/* MODAL CARD */}
          <div
            className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl font-bold"
            >
              ×
            </button>
            <img
              src={`${IMAGE_URL}${selectedProduct.image}`}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <h2 className="text-2xl font-bold mt-4">
              {selectedProduct.name}
            </h2>
            <p className="text-green-600 font-semibold mt-2">
              Rp {Number(selectedProduct.price).toLocaleString("id-ID")}
            </p>

            <p className="text-gray-600 mt-2">
              Stock: {selectedProduct.stock}
            </p>
            <p className="text-gray-500 mt-4">
              {selectedProduct.description || "No description"}
            </p>
          </div>
        </div>
      )}

    {/* Conf delete modal */}
      {deleteProduct && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => setDeleteProduct(null)}
        >

          <div
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >

            <h2 className="text-xl font-bold mb-2">
              Delete Product
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {deleteProduct.name}
              </span>?
            </p>

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setDeleteProduct(null)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}
      {showWelcome && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => setShowWelcome(false)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-xl w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2">
              Welcome to BatterFools!
            </h2>
            <p className="text-gray-600 mb-4">
              Unfortunately, we sell breads
            </p>
            <button
              onClick={() => setShowWelcome(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Start Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;