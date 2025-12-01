

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [placed, setPlaced] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Check login immediately when page loads
  useEffect(() => {
    if (!token) {
      alert("You must be logged in to access checkout.");
      navigate("/login");
    } else {
      const fetchCart = async () => {
        try {
          const res = await axios.get("http://localhost:5000/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCartItems(res.data.items || []);
        } catch (err) {
          console.error("Error fetching cart:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchCart();
    }
  }, [navigate, token]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !address.trim()) {
      alert("Please fill in name, email and address before placing the order.");
      return;
    }

    if (!token) {
      alert("Please log in to place an order.");
      return;
    }

    try {
      // ✅ Call backend to place order
      await axios.post(
        "http://localhost:5000/orders",
        { shipping: { name, email, address } },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Clear cart in backend
      await axios.delete("http://localhost:5000/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPlaced(true);

      setTimeout(() => {
        navigate("/");
      }, 1800);
    } catch (err) {
      console.error("Order failed:", err);
      alert("Failed to place order.");
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) return <p>Loading checkout...</p>;

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {placed ? (
        <div className="order-placed">Order placed</div>
      ) : (
        <div className="checkout-grid">
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <h2>Shipping Details</h2>
            <label>
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>

            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>

            <label>
              Address
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
            </label>

            <button className="place-order-btn" type="submit">Place Order</button>
          </form>

          <aside className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cartItems.length > 0 ? (
                cartItems.map((it) => (
                  <div key={it.productId._id} className="summary-item">
                    <img src={it.productId.image} alt={it.productId.name} loading="lazy" />
                    <div>
                      <div className="s-title">{it.productId.name}</div>
                      <div className="s-meta">Qty: {it.quantity}</div>
                    </div>
                    <div className="s-price">
                      ${(it.productId.price * it.quantity).toFixed(2)}
                    </div>
                  </div>
                ))
              ) : (
                <p>No items in cart</p>
              )}
            </div>

            <div className="summary-footer">
              <div className="row"><span>Items</span><span>{totalQuantity}</span></div>
              <div className="row"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
              <div className="row total"><span>Total</span><span>${totalPrice.toFixed(2)}</span></div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default Checkout;