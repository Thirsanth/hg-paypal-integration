// import React, { useState } from "react";
// import axios from "axios";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useNavigate } from "react-router-dom";


// function Payment({ total,cartItems }) {
//   const [productType, setProductType] = useState("kids candies");

//   const navigate = useNavigate();

//   const client_id = import.meta.env.VITE_CLIENT_ID;
  

//   return (
//     <div className="payment-box">
//       <h2>Pay With PayPal</h2>

//       <label>Total Amount</label>
//       <input
//         type="number"
//         value={total}
//         readOnly
//       />
    


//       <PayPalScriptProvider options={{ "client-id": client_id }}>
//         <PayPalButtons
//           createOrder={async () => {
//             const res = await axios.post("http://localhost:5000/create-paypal-order", {
//               amount: total.toFixed(2),
//             });
//             return res.data.id;
//           }}
//           onApprove={async (data) => {
//             await axios.post("http://localhost:5000/capture-paypal-order", {
//               orderId: data.orderID,
//               cartItems:cartItems
//             });
//             alert("✅ Payment successful and order saved!");
//             navigate("/thank-you", { state: { orderId: data.orderID } });
//           }}
//         />
//       </PayPalScriptProvider>
//     </div>
//   );
// }

// export default Payment;


import React, { useContext } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";

function Payment({ total, cartItems, address, onSuccess }) {
  const navigate = useNavigate();
  const client_id = import.meta.env.VITE_CLIENT_ID;
  const { clearCart } = useContext(CartContext);

  const createOrder = async () => {
    const res = await axios.post("https://hg-paypal-backend.onrender.com/create-paypal-order", {
      amount: total,
    });
    return res.data.id;
  };

  const captureOrder = async (orderID) => {
    await axios.post("https://hg-paypal-backend.onrender.com/capture-paypal-order", {
      orderId: orderID,
      cartItems,
       address,
    });
    alert("✅ Payment successful!");
    // onSuccess(orderID);
    clearCart();
    navigate("/checkout4", {
      state: {
        orderId: orderID, // or just `orderID`
      },
    });
  };

  return (
    <div className="payment-box">
      <h2>Pay With PayPal</h2>
      <input type="number" value={total} readOnly />
      <PayPalScriptProvider options={{ "client-id": client_id }}>
        <PayPalButtons
          createOrder={createOrder}
          onApprove={(data) => captureOrder(data.orderID)}
        />
        
      </PayPalScriptProvider>
    </div>
  );
}

export default Payment;
