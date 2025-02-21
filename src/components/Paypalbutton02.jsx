import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypalbutton = ({ amount }) => {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const ClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const LambdaAPI = "https://xx9l1bzzga.execute-api.us-east-1.amazonaws.com/dev";

  const handlePayment = async (orderID) => {
    try {
      const response = await fetch(LambdaAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID }),
      });

      const data = await response.json();
      console.log("Lambda Response:", data);

      if (response.ok) {
        setPaidFor(true);
      } else {
        setError(data.message || "Payment failed.");
      }
    } catch (err) {
      console.error("Lambda Request Error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": ClientId }}>
      <div>
        <h2>Products</h2>

        {paidFor ? (
          <h3>Payment Successful! 🎉</h3>
        ) : (
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD", // Ensure currency is set
                      value: amount.toFixed(2), // Use amount passed from parent (grandTotal)
                    },
                    shipping_preference: "GET_FROM_FILE",
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(() => {
                handlePayment(data.orderID);
              });
            }}
            onError={(err) => {
              setError(err);
              console.error("PayPal Checkout Error:", err);
            }}
          />
        )}

        {error && <h3>Error: {error}</h3>}
      </div>
    </PayPalScriptProvider>
  );
};

export default Paypalbutton;
