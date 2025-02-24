import React, { useState, useContext } from "react";
import Paypalbutton from "../components/Paypalbutton";
import { Cartcontext } from "../components/Cartcontext";
import "../design/Product.css";

const Cartpage = () => {
  const { cartItems, total, deliveryFee, removeFromCart } = useContext(Cartcontext);
  const grandTotal = (total + deliveryFee).toFixed(2);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    email: "",
    phone: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (!shippingInfo.name.trim()) errors.name = "Name is required";
    if (!shippingInfo.address.trim()) errors.address = "Address is required";
    if (!shippingInfo.city.trim()) errors.city = "City is required";
    if (!shippingInfo.state.trim()) errors.state = "State is required";
    if (!/^\d{5}$/.test(shippingInfo.postalCode)) errors.postalCode = "Postal Code must be 5 digits";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) errors.email = "Valid email is required";
    if (!/^\d{10}$/.test(shippingInfo.phone)) errors.phone = "Phone must be 10 digits";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsFormSubmitted(true);
    console.log("Shipping Info Submitted:", shippingInfo);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <p>***All sales are final.  However, if you experience any 
        issues with your purchase, please reach out to us and we'll do 
        our best to resolve the issue. email: bobbydigi2016@yahoo.com***</p>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
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

          {!isFormSubmitted ? (
            <div>
              <h3>Shipping Information</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  Name:
                  <input type="text" name="name" value={shippingInfo.name} onChange={handleChange} required />
                  {formErrors.name && <span style={{ color: "red" }}>{formErrors.name}</span>}
                </label>
                <label>
                  Address:
                  <input type="text" name="address" value={shippingInfo.address} onChange={handleChange} required />
                  {formErrors.address && <span style={{ color: "red" }}>{formErrors.address}</span>}
                </label>
                <label>
                  City:
                  <input type="text" name="city" value={shippingInfo.city} onChange={handleChange} required />
                  {formErrors.city && <span style={{ color: "red" }}>{formErrors.city}</span>}
                </label>
                <label>
                  State:
                  <input type="text" name="state" value={shippingInfo.state} onChange={handleChange} required />
                  {formErrors.state && <span style={{ color: "red" }}>{formErrors.state}</span>}
                </label>
                <label>
                  Postal Code:
                  <input type="text" name="postalCode" value={shippingInfo.postalCode} onChange={handleChange} required />
                  {formErrors.postalCode && <span style={{ color: "red" }}>{formErrors.postalCode}</span>}
                </label>
                <label>
                  Email:
                  <input type="email" name="email" value={shippingInfo.email} onChange={handleChange} required />
                  {formErrors.email && <span style={{ color: "red" }}>{formErrors.email}</span>}
                </label>
                <label>
                  Phone:
                  <input type="tel" name="phone" value={shippingInfo.phone} onChange={handleChange} required />
                  {formErrors.phone && <span style={{ color: "red" }}>{formErrors.phone}</span>}
                </label>
                <button type="submit">Submit Shipping Info</button>
              </form>
            </div>
          ) : (
            <div>
              <h3>Shipping Info:</h3>
              <p>{shippingInfo.name}</p>
              <p>{shippingInfo.address}</p>
              <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}</p>
              <p>Email: {shippingInfo.email}</p>
              <p>Phone: {shippingInfo.phone}</p>
              <Paypalbutton
                amount={Number(grandTotal)}
                shippingInfo={shippingInfo}
                cartItems={cartItems} // Pass cartItems here
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cartpage;