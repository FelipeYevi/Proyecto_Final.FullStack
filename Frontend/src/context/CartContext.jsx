import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./userContext";
import axios from "axios";

//crear contexto
const CartContext = createContext();

// exporta hook 
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user, token } = useUser();
  const [cart, setCart] = useState([]);

  const saveCartToDB = async (currentCart) => {
    if (!token || !user?.email) return;
    try {
      await axios.post("https://proyecto-final-fullstack-dh99.onrender.com/api/cart/sync", 
        { cart: currentCart }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Error al guardar carrito:", err);
    }
  };

  //login
  useEffect(() => {
    const handleLoginSync = async () => {
      if (token && user?.email) {
        if (cart.length > 0) {
          await saveCartToDB(cart);
        } else {
          try {
            const { data } = await axios.get("https://proyecto-final-fullstack-dh99.onrender.com/api/cart", {
              headers: { Authorization: `Bearer ${token}` }
            });
            setCart(data || []);
          } catch (err) {
            console.error("Error al obtener carrito:", err);
          }
        }
      }
    };
    handleLoginSync();
  }, [token]);


  const addToCart = (producto) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === producto.id);
      return existing 
        ? prev.map((item) => item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prev, { ...producto, quantity: 1 }];
    });
  };

  const removeFromCart = (productoId) => {
    setCart((prev) => 
      prev.map((item) => item.id === productoId ? { ...item, quantity: item.quantity - 1 } : item)
          .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // pago
  const prepareCheckout = async () => {
    await saveCartToDB(cart);
  };

  // logout
  const handleLogoutCart = async () => {
    if (token) {
      await saveCartToDB(cart);
    }
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      setCart, 
      total, 
      addToCart, 
      removeFromCart, 
      prepareCheckout, 
      handleLogoutCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};