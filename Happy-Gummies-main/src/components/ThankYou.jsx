import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import html2pdf from "html2pdf.js";

function ThankYou() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const orderRef = useRef();

  const orderId = state?.orderId;

  useEffect(() => {
    if (orderId) {
      axios
        .get(`http://localhost:5000/api/orders/${orderId}`)
        .then((res) => {
          setOrder(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch order", err);
          setLoading(false);
        });
    }
  }, [orderId]);

  const downloadPDF = () => {
    const element = orderRef.current;
    const opt = {
      margin: 0.5,
      filename: `Order_${order?.orderId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(element).set(opt).save();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleString();
  };

  if (loading)
    return <div className="text-center p-8 text-lg">Loading order...</div>;
  if (!order)
    return (
      <div className="text-center p-8 text-red-500 text-lg">Order not found.</div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8 mt-[20px]">
      <div
        className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8"
        ref={orderRef}
      >
        <h1 className="text-3xl font-bold text-green-600 mb-4 text-center">
          ✅ Payment Successful
        </h1>

        <div className="text-gray-800 text-center space-y-1 mb-6">
          <p>
            <strong>Order ID:</strong> {order.orderId}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Amount:</strong> ${order.amount}
          </p>
          <p>
            <strong>Payer:</strong> {order.payer.name} ({order.payer.email})
          </p>
          <p>
            <strong>Date & Time:</strong> {formatDate(order.create_time)}
          </p>
        </div>

        {/* Product Section */}
        <h2 className="text-xl font-semibold text-center mb-4 border-b pb-2">
          🛒 Ordered Products
        </h2>
        <div className="flex flex-col items-center gap-4">
          {order.products.map((item, idx) => (
            <div
              key={idx}
              className="order-summary-list-set flex items-center gap-4 p-4 border rounded-lg w-full max-w-xl bg-gray-50 shadow-sm"
            >
              <img
                src={item.image || "/placeholder.png"}
                alt={item.name}
                className="w-20 h-20 object-contain rounded"
              />
              <section>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-700">
                  ${item.price} × {item.quantity}
                </p>
              </section>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-10 space-x-4">
          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            📄 Download Summary
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 text-white px-5 py-2 rounded hover:bg-gray-800 transition"
          >
            🏠 Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;

