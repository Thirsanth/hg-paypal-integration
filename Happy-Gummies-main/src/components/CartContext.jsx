import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load from localStorage on first render
  useEffect(() => {
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  // Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const increaseQuantity = (id) => {
  setCartItems(prevItems =>
    prevItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const decreaseQuantity = (id) => {
  setCartItems(prevItems =>
    prevItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};

  const addToCart = (item) => {
    const exists = cartItems.find((i) => i.id === item.id);
    if (exists) {
      setCartItems(cartItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
  setCartItems([]);               // Clear from state
  localStorage.removeItem("cart"); // Clear from localStorage
};

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart,increaseQuantity,decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
