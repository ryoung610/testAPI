import { useState, useEffect } from "react";

function TestLambda() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://jarhem0s0e.execute-api.us-east-1.amazonaws.com/dev")
      .then((response) => response.json())  // If your Lambda returns JSON
      .then((data) => setMessage(data))     // Update state with response
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h2>Welcome!</h2>
      <p>{message.message || "Waiting for response..."}</p>  {/* Access 'message' state directly */}
    </div>
  );
}

export default TestLambda;
