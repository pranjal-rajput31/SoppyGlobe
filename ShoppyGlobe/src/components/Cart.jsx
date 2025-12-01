



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CartItem from "./CartItem";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ✅ Fetch cart from backend on mount
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

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  // ✅ Clear cart
  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      try {
        await axios.delete("http://localhost:5000/cart/clear", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems([]);
      } catch (err) {
        console.error("Error clearing cart:", err);
      }
    }
  };

  // ✅ Remove single item
  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter((item) => item.productId._id !== productId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // ✅ Update quantity
  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      await axios.put(
        `http://localhost:5000/cart/${productId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart(); // refresh cart after update
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // ✅ Totals
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const tax = (totalPrice * 0.1).toFixed(2);
  const grandTotal = (totalPrice + parseFloat(tax)).toFixed(2);

  if (loading) return <p>Loading cart...</p>;

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h1>Shopping Cart</h1>
          <p>Your cart is empty</p>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>

      <div className="cart-content">
        <div className="cart-items-section">
          <div className="items-count">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in cart
          </div>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <CartItem
                key={item.productId._id}
                item={item}
                onRemove={() => handleRemoveItem(item.productId._id)}
                onUpdateQuantity={(qty) =>
                  handleUpdateQuantity(item.productId._id, qty)
                }
              />
            ))}
          </div>
          <button className="clear-cart-btn" onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>

        <div className="cart-summary-section">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Items:</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span className="free">FREE</span>
            </div>
            <div className="summary-row">
              <span>Tax (10%):</span>
              <span>${tax}</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-row total">
              <span>Total:</span>
              <span>${grandTotal}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;