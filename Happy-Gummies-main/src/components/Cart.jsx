
// import React, { useContext } from "react";
// import { CartContext } from "./CartContext";
// import { useNavigate } from "react-router-dom";


// function Cart({ onClose }) {
//   const { cartItems, removeFromCart } = useContext(CartContext);
//   const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   const navigate = useNavigate();

// const handlePlaceOrder = () => {
//   navigate("/checkout", {
//     state: {
//       cartItems,
//       total,
//     },
//   });
// };

//   return (
//     <div className="cart">
//       <div className="cart-container">
//         <div className="cart-header">
//           <h2>{cartItems.length} Items in your Bag</h2>
//           <div className="cart-hide-button" onClick={onClose}>X</div>
//         </div>
//         <div className="cart-list">
//           {cartItems.length === 0 ? (
//             <p>Your cart is empty.</p>
//           ) : (
//             cartItems.map((item) => (
//               <div className="cart-list-set" key={item.id}>
//                 <img src={item.image} alt={item.name} />
//                 <div className="cart-list-set-info">
//                   <h3>{item.name}</h3>
//                   <p>${item.price} × {item.quantity}</p>
//                   <button onClick={() => removeFromCart(item.id)}>Remove</button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//         <div className="cart-sub-total">
//           <section>
//             <h2>Subtotal</h2>
//             <h2>${total.toFixed(2)}</h2>
//           </section>
//         </div>
//         <div className="cart-place-order-button">
//   <button onClick={() => {
//     handlePlaceOrder();
//     onClose();
//   }} className="ProductButton">
//     Place Order
//   </button>
// </div>

//       </div>
//     </div>
//   );
// }

// export default Cart;


// import React, { useContext } from "react";
// import { CartContext } from "./CartContext";
// import { useNavigate } from "react-router-dom";
// import EmptyCart from "../assets/Empty Cart.png"; // Adjust path if needed

// function Cart({ onClose }) {
//   const { cartItems, removeFromCart,increaseQuantity,
//     decreaseQuantity, } = useContext(CartContext);
//   const total = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const navigate = useNavigate();

//   const handlePlaceOrder = () => {
//     navigate("/checkout", {
//       state: {
//         cartItems,
//         total,
//       },
//     });
//   };

//   return (
//     <div className="cart">
//       <div className="cart-container">
//         {/* Header */}
//         <div className="cart-header">
//           <h2>{cartItems.length} Items in your Bag</h2>
//           <div className="cart-hide-button" onClick={onClose}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               viewBox="0 0 20 20"
//               fill="none"
//             >
//               <path
//                 d="M5.45301 15.8333L4.16699 14.5473L8.72942 9.98488L4.16699 5.45269L5.45301 4.16667L10.0154 8.7291L14.5476 4.16667L15.8337 5.45269L11.2712 9.98488L15.8337 14.5473L14.5476 15.8333L10.0154 11.2709L5.45301 15.8333Z"
//                 fill="#121212"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Cart List */}
//         <div className="cart-list">
//           {cartItems.length === 0 ? (
//             <div className="empty-cart-list">
//               <img src={EmptyCart} alt="Empty Cart" />
//               <section>
//                 <h3>No Product</h3>
//                 <p>Go find the products you like.</p>
//               </section>
//             </div>
//           ) : (
//             cartItems.map((item) => (
//               <div className="cart-list-set" key={item.id}>
//                 <img src={item.image} alt={item.name} />
//                 <div className="cart-list-set-info">
//                   <div className="cart-list-set-info-text">
//                     <section>
//                       <h3>{item.name}</h3>
//                       <p>{item.description}</p>
//                     </section>
//                     <p>${item.price}</p>
//                   </div>

//                   <div className="cart-list-set-info-quantity">
//                     <section>
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="20"
//                         height="20"
//                         viewBox="0 0 20 20"
//                         fill="none"
//                       >
//                         <rect
//                           x="3"
//                           y="9"
//                           width="14"
//                           height="2"
//                           rx="1"
//                           fill="#606060"
//                         />
//                       </svg>
//                       <p>{item.quantity}</p>
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="20"
//                         height="20"
//                         viewBox="0 0 20 20"
//                         fill="none"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           clipRule="evenodd"
//                           d="M11 9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44772 3.44772 9 4 9H9V4C9 3.44772 9.44772 3 10 3C10.5523 3 11 3.44772 11 4V9Z"
//                           fill="#606060"
//                         />
//                       </svg>
//                     </section>
//                     <button onClick={() => removeFromCart(item.id)}>
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Subtotal & Place Order */}
//         {cartItems.length > 0 && (
//           <>
//             <div className="cart-sub-total">
//               <section>
//                 <h2>Subtotal</h2>
//                 <h2>${total.toFixed(2)}</h2>
//               </section>
//               <div className="cart-place-order-button">
//                 <button
//                   onClick={() => {
//                     handlePlaceOrder();
//                     onClose();
//                   }}
//                   className="ProductButton"
//                 >
//                   Place Order
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Cart;

import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../assets/Empty Cart.png";

function Cart({ onClose }) {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate("/checkout1", {
      state: {
        cartItems,
        total,
      },
    });
  };

  return (
    <div className="cart">
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <h2>{cartItems.length} Items in your Bag</h2>
          <div className="cart-hide-button" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M5.45301 15.8333L4.16699 14.5473L8.72942 9.98488L4.16699 5.45269L5.45301 4.16667L10.0154 8.7291L14.5476 4.16667L15.8337 5.45269L11.2712 9.98488L15.8337 14.5473L14.5476 15.8333L10.0154 11.2709L5.45301 15.8333Z"
                fill="#121212"
              />
            </svg>
          </div>
        </div>

        {/* Cart List */}
        <div className="cart-list">
          {cartItems.length === 0 ? (
            <div className="empty-cart-list">
              <img src={EmptyCart} alt="Empty Cart" />
              <section>
                <h3>No Product</h3>
                <p>Go find the products you like.</p>
              </section>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-list-set" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-list-set-info">
                  <div className="cart-list-set-info-text">
                    <section>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                    </section>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>

                  <div className="cart-list-set-info-quantity">
                    <section>
                      <svg
                        onClick={() => decreaseQuantity(item.id)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="cursor-pointer"
                      >
                        <rect
                          x="3"
                          y="9"
                          width="14"
                          height="2"
                          rx="1"
                          fill="#606060"
                        />
                      </svg>
                      <p>{item.quantity}</p>
                      <svg
                        onClick={() => increaseQuantity(item.id)}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="cursor-pointer"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11 9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44772 3.44772 9 4 9H9V4C9 3.44772 9.44772 3 10 3C10.5523 3 11 3.44772 11 4V9Z"
                          fill="#606060"
                        />
                      </svg>
                    </section>
                    <button onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Subtotal & Place Order */}
        {cartItems.length > 0 && (
          <div className="cart-sub-total">
            <section>
              <h2>Subtotal</h2>
              <h2>${total.toFixed(2)}</h2>
            </section>
            <div className="cart-place-order-button">
              <button
                onClick={() => {
                  handlePlaceOrder();
                  onClose();
                }}
                className="ProductButton"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;

