import React, { useContext } from 'react';
import Paypalbutton from '../components/Paypalbutton'; // We'll implement this component
import { Cartcontext } from '../components/Cartcontext';
import "../design/Product.css"

const Cartpage = () => {
  const { cartItems, total, deliveryFee, removeFromCart } = useContext(Cartcontext);

  // Calculate grand total
  const grandTotal = (total + deliveryFee).toFixed(2);  // Ensure two decimal places for consistency

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.image[0]} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ))}
          <div>
            <h3>Total: ${total.toFixed(2)}</h3>
            <h4>Delivery Fee: ${deliveryFee.toFixed(2)}</h4>
            <h4>Grand Total: ${grandTotal}</h4>
          </div>
          {/* Pass grandTotal (total + deliveryFee) to PayPal button */}
          <Paypalbutton amount={Number(grandTotal)} /> {/* PayPal Button */}
        </div>
      )}
    </div>
  );
};

export default Cartpage;
