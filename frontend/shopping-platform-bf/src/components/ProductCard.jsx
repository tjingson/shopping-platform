function ProductCard({ product, onDelete, onEdit }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      <img
        src={(product.image=="") ? "https://placehold.co/600x400/png" : product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-2">

        <h2 className="text-lg font-semibold text-gray-800">
          {product.name}
        </h2>

        <p className="text-green-600 font-bold">
          Rp {Number(product.price).toLocaleString("id-ID")}
        </p>

        <p className="text-sm text-gray-500">
          Stock: {product.stock}
        </p>

        <div className="flex gap-2 mt-2">

          {user?.role === "admin" ? (
            <>
              <button
                onClick={() => onEdit(product)}
                className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(product._id)}
                className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                className="flex-1 bg-green-500 text-white py-1 rounded hover:bg-green-600"
              >
                Add to Cart
              </button>

              <button
                className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
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