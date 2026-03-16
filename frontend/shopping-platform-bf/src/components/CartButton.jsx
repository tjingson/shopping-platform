import { useState } from "react";
import CartModal from "./CartModal";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";

function CartButton() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const { items } = useCart();

  const count = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (loading) return null;
  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center text-xl z-50"
      >
        🛒
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 rounded-full">
            {count}
          </span>
        )}
      </button>
      {open && <CartModal close={() => setOpen(false)} />}
    </>
  );
}

export default CartButton;