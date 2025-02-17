// src/components/CartButton.jsx
import React, { useContext } from 'react';
import { Cartcontext } from '../context/Cartcontext';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js'; // Import the assets object
import Cartpage from '../pages/Cartpage.jsx';

const { shop_cart01 } = assets; // Destructure to get the cart image

const Cartbutton = () => {
  const { cartItems } = useContext(Cartcontext);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0); // Calculate the total items

  return (
    <div className="cart-button">
      <Link to="/cartpage">
      
        <img 
          src={shop_cart01}  // Use the cart image here
          alt="Cart" 
          className="cart-icon" 
        />
        {cartCount > 0 && (
          <span className="cart-count">{cartCount}</span> // Display the item count in the cart
        )}
      </Link>
    </div>
  );
};

export default Cartbutton;
