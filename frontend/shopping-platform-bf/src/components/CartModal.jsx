import { useEffect, useState } from "react";
import API from "../services/api";

function CartModal({ close }) {
  const [items, setItems] = useState([]);
  const validItems = items.filter(item => item.product);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await API.get("/cart");
        setItems(data.items || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCart();
  }, []);

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

        {validItems.length === 0 ? (
          <p className="text-gray-500">
            Your cart is empty
          </p>
        ) : (
          validItems.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between border-b py-3"
            >

              <div>
                <p className="font-medium">
                  {item.product.name}
                </p>

                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p>
                Rp {item.product.price}
              </p>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default CartModal;