import React from 'react'
import  { useState, useEffect } from "react";
import TestAPI from './TestAPI';

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
        <h2>hello lambda</h2>
       <h2><TestAPI /></h2>



    </div>
  );
};

export default Product;
