import React, { useState, useEffect } from 'react';
import { products } from '../assets/assets.js';
import '../design/Product.css';
import { useCart } from '../components/Cartcontext.jsx';  // ✅ UseCart instead of useContext

const Product = () => {
  const [message, setMessage] = useState("");
  const { addToCart } = useCart();  // ✅ Correct usage of CartContext

  useEffect(() => {
    fetch("https://gnk9ff735d.execute-api.us-east-1.amazonaws.com/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Hello from React!" })
    })
      .then((response) => response.json())
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <h2>{message.message || "Waiting for response..."}</h2>
      <br />
      <div className="product-page">
        <h1>Our Sunglass Collection</h1>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image[0]} alt={product.name} className="product-image" />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p className="product-price">${product.price}</p>
              <p className="product-category">{product.category}</p>
              {product.subCategory && <p className="product-subcategory">{product.subCategory}</p>}
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
