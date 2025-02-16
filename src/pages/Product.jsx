import React from 'react'
import  { useState, useEffect } from "react";
import TestAPI from './TestAPI';
import { products } from '../assets/assets.js';  // Import the products array from assets.js
import '../design/Product.css';


const Product = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://gnk9ff735d.execute-api.us-east-1.amazonaws.com/test", {  // ✅ Fixed
      method: "POST",  // ✅ Ensuring a POST request
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Hello from React!" }) // ✅ Sending a sample body
    })
      .then((response) => response.json())  // ✅ Parsing JSON response
      .then((data) => setMessage(data))  // ✅ Updating state
      .catch((error) => console.error("Error:", error));
  }, []); // ✅ Runs only on mount

  return (
    <div>
      <h2>Products</h2>
      <h2>{message.message || "Waiting for response..."}</h2> 
       <br/>
       
       <div className="product-page">
      <h1>Our Sunglass Collection</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image[0]} alt={product.name} className="product-image" />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="product-price">${product.price}</p>
            <p className="product-category">{product.catagory}</p>
            {product.subCatagory && <p className="product-subcategory">{product.subCatagory}</p>}
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>


        <h2>hello lambda</h2>
       <h2><TestAPI /></h2>



    </div>
  );
};

export default Product;
