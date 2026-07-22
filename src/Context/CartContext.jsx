import { createContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CartContext = createContext();

function CartProvider({ children }) {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const token = sessionStorage.getItem("token");

  const getCart = async () => {
    if (!token) return;

    try {
      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (productId) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.post(
        "/cart",
        {
          product: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getCart();
      toast.success("Product Added to Cart");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add product");
    }
  };

  const updateQuantity = async (cartId, quantity) => {
    try {
      await api.put(
        `/cart/${cartId}`,
        {
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  const removeCart = async (cartId) => {
    try {
      await api.delete(`/cart/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const subtotal = cart.reduce((sum, item) => {
    if (!item.product) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal,
        addToCart,
        updateQuantity,
        removeCart,
        clearCart,
        getCart,
        cartCount: cart.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;