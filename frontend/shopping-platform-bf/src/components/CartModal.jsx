import { useState } from "react";
import { useCart } from "../context/cartContext";
import { formatRupiah } from "../utils/format"

function CartModal({ close }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { items, removeItem, clearCart, subtotal } = useCart();

  return (
    <div
      className="fixed inset-0 flex justify-end z-50"
      onClick={close}
    >
      {/* CART PANEL */}
      <div
        className="bg-white w-96 h-full shadow-xl p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            Your Cart
          </h2>
          <button
            onClick={close}
            className="text-gray-500 text-xl"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500">
            Your cart is empty
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.product._id}
              className="relative border-b overflow-hidden group"
            >

              {/* DELETE BUTTON (background layer) */}
                <button
                  onClick={() => removeItem(item.product._id)}
                  className="absolute right-0 top-0 h-full w-24 bg-red-500 text-white flex items-center justify-center z-0"
                >
                  Delete
                </button>

                {/* SLIDING ROW (foreground layer) */}
                <div className="relative z-10 bg-white px-3 py-4 flex justify-between items-center transition-transform duration-300 group-hover:-translate-x-24">

                <div>
                  <p className="font-medium">
                    {item.product.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-medium">
                  Rp {formatRupiah(item.product.price)}
                </p>

              </div>

            </div>
          ))
        )}

        <div className="mt-6 border-t pt-4 flex justify-between font-semibold text-lg">
          <span>Subtotal</span>
          <span>
            Rp {formatRupiah(subtotal)}
          </span>
        </div>

      <button
        onClick={() => setShowConfirm(true)}
        className="mt-6 w-full bg-red-600 text-white py-2 rounded"
      >
        Clear Cart
      </button>
      </div>
      {showConfirm && (

        <div className="fixed inset-0 flex items-center justify-center bg-black/40">

          <div className="bg-white p-6 rounded-lg w-80">

            <h3 className="text-lg font-bold mb-4">
              Clear Cart?
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              This will remove all items.
            </p>

            <div className="flex gap-3">

              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={clearCart}
                className="flex-1 bg-red-600 text-white py-2 rounded"
              >
                Clear
              </button>

            </div>

          </div>

        </div>

      )}
    </div>
  );
}

export default CartModal;