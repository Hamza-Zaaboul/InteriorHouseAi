import React, { useState } from "react";

const RefundButton = ({ paymentIntentId }) => {
  const [loading, setLoading] = useState(false);
  const reason = "requested_by_customer";
  const handleRefund = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/stripe-refund", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentIntentId, reason }),
      });

      if (response.ok) {
        console.log("Refund successful");
      } else {
        console.error("Refund failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <button onClick={handleRefund} disabled={loading}>
      {loading ? "Loading..." : "Request Refund"}
    </button>
  );
};

export default RefundButton;
