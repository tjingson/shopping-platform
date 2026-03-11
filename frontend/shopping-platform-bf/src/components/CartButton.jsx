import { useState } from "react";
import CartModal from "./CartModal";

function CartButton() {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center text-xl z-50"
      >
        🛒
      </button>

      {open && <CartModal close={() => setOpen(false)} />}
    </>
  );
}

export default CartButton;