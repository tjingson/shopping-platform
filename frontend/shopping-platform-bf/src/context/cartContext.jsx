import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "./authContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart");
      setItems((data.items || []).filter(item => item.product));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setItems([]);
    }
  }, [user]);

  const addToCart = async (productId) => {
    const { data } = await API.post("/cart", { productId });
    setItems((data.items || []).filter(item => item.product));
  };

  const removeItem = async (productId) => {
    const { data } = await API.delete(`/cart/${productId}`);
    setItems((data.items || []).filter(item => item.product));

  };

  const clearCart = async () => {
    const { data } = await API.delete("/cart");
    setItems(data.items || []);
  };

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addToCart,
        removeItem,
        clearCart,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );

};

export const useCart = () => useContext(CartContext);