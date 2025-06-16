import React, { useState } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";


function Payment({ total,cartItems }) {
  const [productType, setProductType] = useState("kids candies");

  const navigate = useNavigate();

  const client_id = import.meta.env.VITE_CLIENT_ID;
  

  return (
    <div className="payment-box">
      <h2>Pay With PayPal</h2>

      <label>Total Amount</label>
      <input
        type="number"
        value={total}
        readOnly
      />
    


      <PayPalScriptProvider options={{ "client-id": client_id }}>
        <PayPalButtons
          createOrder={async () => {
            const res = await axios.post("http://localhost:5000/create-paypal-order", {
              amount: total.toFixed(2),
            });
            return res.data.id;
          }}
          onApprove={async (data) => {
            await axios.post("http://localhost:5000/capture-paypal-order", {
              orderId: data.orderID,
              cartItems:cartItems
            });
            alert("✅ Payment successful and order saved!");
            navigate("/thank-you", { state: { orderId: data.orderID } });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default Payment;
