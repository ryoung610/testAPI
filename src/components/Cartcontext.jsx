import React, { createContext, useState, useContext, useEffect } from "react";

// Create context for the cart
const Cartcontext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(Cartcontext);
};

// The provider component for the context
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0); // Add a state for grandTotal

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  // Calculate the total price of the cart items
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Calculate the delivery fee
  const calculateDeliveryFee = (subtotal) => {
    if (subtotal >= 100) return 0; // Free delivery for orders over $100
    if (subtotal >= 50) return 5; // $5 delivery fee for orders above $50
    return 10; // $10 delivery fee for orders under $50
  };

  // Calculate grand total and set values for total, deliveryFee, and grandTotal
  useEffect(() => {
    const subtotal = calculateTotal();
    const fee = calculateDeliveryFee(subtotal);
    const grandTotalValue = Number((subtotal + fee).toFixed(2));

    setTotal(subtotal);
    setDeliveryFee(fee);
    setGrandTotal(grandTotalValue); // Set the grand total
  }, [cartItems]);

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0); // Add up all item quantities
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Cartcontext.Provider value={{ cartItems, total, deliveryFee, grandTotal, addToCart, removeFromCart, getCartItemCount, cartItemCount }}>
      {children}
    </Cartcontext.Provider>
  );
};

// Ensure Cartcontext is exported
export { Cartcontext };
