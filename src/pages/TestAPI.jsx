import React, { useState } from "react";

const Product = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError(""); // Reset error state

    // Validate input
    if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
      setError("Please enter valid numbers");
      return;
    }

    // Send POST request to Lambda
    fetch("https://xx9l1bzzga.execute-api.us-east-1.amazonaws.com/dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        num1: Number(num1),
        num2: Number(num2),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result !== undefined) {
          setResult(data.result);
        } else {
          setError("Failed to get result from server");
        }
      })
      .catch((error) => setError("Error: " + error.message));
  };

  return (
    <div>
      <h2>Calculator</h2>
      <input
        type="number"
        placeholder="Enter first number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter second number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <button onClick={handleCalculate}>Calculate</button>

      {result !== null && <h3>Result: {result}</h3>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Product;
