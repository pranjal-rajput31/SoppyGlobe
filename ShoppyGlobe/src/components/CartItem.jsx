import React from 'react'
import { useDispatch } from 'react-redux'
import { removeItem, updateQuantity } from '../store/cartSlice'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'
import './CartItem.css'
// Component
function CartItem({ item }) {
  const dispatch = useDispatch()
// Handlers
  const handleRemove = () => {
    dispatch(removeItem(item.id))
  }
// Quantity Handlers
  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
  }
// Decrement Handler
  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
    }
  }
// Direct Input Handler
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
    }
  }
// Total price for this item
  const itemTotal = (item.price * item.quantity).toFixed(2)
// Render
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} loading="lazy" />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>

      <div className="cart-item-quantity">
        <button
          className="qty-btn"
          onClick={handleDecrement}
          disabled={item.quantity <= 1}
          title="Decrease quantity"
        >
          <FaMinus style={{ fontSize: '12px' }} />
        </button>
        <input
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="qty-input"
          min="1"
        />
        <button
          className="qty-btn"
          onClick={handleIncrement}
          title="Increase quantity"
        >
          <FaPlus style={{ fontSize: '12px' }} />
        </button>
      </div>

      <div className="cart-item-total">
        <p>${itemTotal}</p>
      </div>

      <button
        className="cart-item-remove-btn"
        onClick={handleRemove}
        title="Remove from cart"
      >
        <FaTrash style={{ fontSize: '16px' }} />
      </button>
    </div>
  )
}

export default CartItem
