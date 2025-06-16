
import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";


function Cart({ onClose }) {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const navigate = useNavigate();

const handlePlaceOrder = () => {
  navigate("/checkout", {
    state: {
      cartItems,
      total,
    },
  });
};

  return (
    <div className="cart">
      <div className="cart-container">
        <div className="cart-header">
          <h2>{cartItems.length} Items in your Bag</h2>
          <div className="cart-hide-button" onClick={onClose}>X</div>
        </div>
        <div className="cart-list">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-list-set" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-list-set-info">
                  <h3>{item.name}</h3>
                  <p>${item.price} × {item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-sub-total">
          <section>
            <h2>Subtotal</h2>
            <h2>${total.toFixed(2)}</h2>
          </section>
        </div>
        <div className="cart-place-order-button">
  <button onClick={() => {
    handlePlaceOrder();
    onClose();
  }} className="ProductButton">
    Place Order
  </button>
</div>

      </div>
    </div>
  );
}

export default Cart;
