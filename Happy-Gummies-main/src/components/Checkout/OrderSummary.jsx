
function OrderSummary({ cartItems, total }) {
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <div className="order-summary-list">
        {cartItems.map((item) => (
          <div className="order-summary-list-set" key={item.id}>
            <img src={item.image} alt={item.name} />
            <section>
              <h3>{item.name}</h3>
              <p>${item.price} × {item.quantity}</p>
            </section>
          </div>
        ))}
      </div>
      <div className="order-summary-details">
        {/* Skip coupon for now */}
        <div className="order-summary-price">
          <div className="order-summary-price-set">
            <h3>Subtotal</h3>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className="order-summary-price-set">
            <h3>Estimated Tax</h3>
            <p>$0.00</p>
          </div>
          <div className="order-summary-price-set">
            <h3>Shipping Fee</h3>
            <p>$0.00</p>
          </div>
          <div className="order-summary-price-set">
            <h3>Total </h3>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;

