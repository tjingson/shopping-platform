import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { IMAGE_URL } from "../services/api";
import { useCart } from "../context/cartContext";
import { formatRupiah } from "../utils/format"

function ProductCard({ product, onDelete, onEdit, onView }) {
  const { user, loading, openAuthModal } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (loading) return;
    if (!user) {
      console.log("OPEN MODAL");
      openAuthModal();
      return
    }
    addToCart(product._id);
    toast.success("Added to Cart");
  }


  return (
    <div
      onClick={() => onView(product)}
      className="bg-white rounded-xl shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer overflow-hidden"
    >
      <img
        src={
          product.image
          ? `${IMAGE_URL}${product.image}`
          :""}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">
          {product.name}
        </h2>

        <p className="text-green-600 font-bold">
          Rp {formatRupiah(product.price)}
        </p>

        <p className="text-sm text-gray-500">
          Stock: {product.stock}
        </p>

        <div className="flex gap-2 mt-2">

          {user?.role === "admin" ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(product)
                }}
                className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(product);
                }}
                className="flex-1 bg-red-500 text-white py-1 rounded"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="flex-1 bg-yellow-500 text-white py-1 rounded"
              >
                Add to Cart
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // buy logic later
                }}
                className="flex-1 bg-green-500 text-white py-1 rounded"
              >
                Buy
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default ProductCard;