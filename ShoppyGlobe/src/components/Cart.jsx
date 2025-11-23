import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CartItem from './CartItem'
import { selectCartSummary, selectCartItems } from '../store/cartSelectors'
import { clearCart } from '../store/cartSlice'
import './Cart.css'


function Cart() {
// Hooks
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const { totalPrice, totalQuantity, isEmpty } = useSelector(selectCartSummary)
// Handlers
  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      dispatch(clearCart())
    }
  }
// Calculations for the summary
  const tax = (totalPrice * 0.1).toFixed(2)
  const grandTotal = (parseFloat(totalPrice) + parseFloat(tax)).toFixed(2)

  // Render empty cart state
  if (isEmpty) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h1>Shopping Cart</h1>
          <p className="empty-message">Your cart is empty</p>
          <p className="empty-submessage">Start shopping to add items to your cart!</p>
          <button
            className="continue-shopping-btn"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }
// Render cart with items
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <button
          className="back-to-products-btn"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items-section">
          <div className="items-count">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart
          </div>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <button
            className="clear-cart-btn"
            onClick={handleClearCart}
          >
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

            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
