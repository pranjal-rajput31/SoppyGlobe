import React from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import "./CartItem.css";

function CartItem({ item, onRemove, onUpdateQuantity }) {
  // Total price for this item
  const itemTotal = (item.productId.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.productId.image} alt={item.productId.name} loading="lazy" />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.productId.name}</h3>
        <p className="cart-item-price">${item.productId.price.toFixed(2)}</p>
      </div>

      <div className="cart-item-quantity">
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity(item.quantity - 1)}
          disabled={item.quantity <= 1}
          title="Decrease quantity"
        >
          <FaMinus style={{ fontSize: "12px" }} />
        </button>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => {
            const newQuantity = parseInt(e.target.value) || 1;
            if (newQuantity > 0) onUpdateQuantity(newQuantity);
          }}
          className="qty-input"
          min="1"
        />
        <button
          className="qty-btn"
          onClick={() => onUpdateQuantity(item.quantity + 1)}
          title="Increase quantity"
        >
          <FaPlus style={{ fontSize: "12px" }} />
        </button>
      </div>

      <div className="cart-item-total">
        <p>${itemTotal}</p>
      </div>

      <button
        className="cart-item-remove-btn"
        onClick={onRemove}
        title="Remove from cart"
      >
        <FaTrash style={{ fontSize: "16px" }} />
      </button>
    </div>
  );
}

export default CartItem;